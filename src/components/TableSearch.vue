<script setup lang="ts">

import TableComponent from '@/components/TableSearch/TableComponent.vue'
import SearchComponent from '@/components/TableSearch/SearchComponent.vue'
import SelectColumn from '@/components/TableSearch/SelectColumn.vue'
import type { ProductType, ColumnType, SearchElement } from './TableSearch/Modules'

import { onMounted, ref } from 'vue'
import { ProductService } from '@/js/ProductService'

const products = ref<ProductType[]>([]);
const filterProducts = ref<ProductType[]>([]);

const columnsList = ref<ColumnType[]>([
  {
    field: 'code',
    header: 'Code'
  }, {
    field: 'name',
    header: 'Name'
  }, {
    field: 'image',
    header: 'Image'
  }, {
    field: 'price',
    header: 'Price'
  }, {
    field: 'category',
    header: 'Category'
  }, {
    field: 'rating',
    header: 'Reviews'
  }, {
    field: 'inventoryStatus',
    header: 'Status'
  }])
const selectedColumns = ref<ColumnType[]>([...columnsList.value]);

function getProducts () {
  ProductService.getProducts()
    .then((data: ProductType[]) => {
      products.value = data;
      filterProducts.value = data;
    });
}

function searchTable (event: SearchElement) {
  const { field, search } = event
  filterProducts.value = [...products.value]
  if (field && search) {
    filterProducts.value = filterProducts.value?.filter((product: ProductType) => {
      if (field && field in product) {
        return product[field].toString().toLowerCase().includes(search.toLowerCase())
      }
      return true;
    })
  }
}

onMounted(() => {
  getProducts();
});

</script>

<template>
 <div class="table-search">
   <div class="table-search__row">
     <search-component
       class="table-search__search"
       :columns="selectedColumns"
       @searchTable="searchTable"
     />
     <select-column
       class="table-search__select"
       v-model="selectedColumns"
       :options="columnsList"
     />
   </div>
   <table-component
     :columns="selectedColumns"
     :products="filterProducts"
   />
 </div>
</template>

<style scoped lang="scss">
.table-search {
  &__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &__search {
    flex: 1 1 auto
  }
  &__select {
    max-width: 20%;
    width: 100%;
  }
}
</style>