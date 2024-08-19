<script setup lang="ts">

import type { PropsSelectColumn } from './Modules'
import DataTable from 'primevue/datatable'
import Rating from 'primevue/rating'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import { ref, toRefs } from 'vue'

const props = defineProps<PropsSelectColumn>();
const { columns, products } = toRefs(props);
const selectedProducts = ref();

const formatCurrency = (value: number) => {
  if (value)
    return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  return;
};

const getStatusLabel = (status: string):string => {
  switch (status) {
    case 'INSTOCK':
      return 'success';

    case 'LOWSTOCK':
      return 'warning';

    case 'OUTOFSTOCK':
      return 'danger';

    default:
      return '';
  }
}

</script>

<template>
  <DataTable
    ref="dt"
    :value="products"
    v-model:selection="selectedProducts"
    dataKey="id"
    :paginator="true"
    :rows="10"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5,10,25]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">

    <Column
      selectionMode="multiple"
      style="width: 3rem"
      :exportable="false"
    />
    <Column
      v-for="(column, index) in columns"
      :key="column.field + '-' + index"
      :field="column.field"
      :header="column.header"
      :sortable="column.field !== 'image'"
      style="min-width:12rem"
    >
      <template
        v-if="column.field === 'image' ||
         column.field === 'price' ||
         column.field === 'rating' ||
         column.field === 'inventoryStatus'"
        #body="slotProps"
      >
        <img
          v-if="column.field === 'image'"
          :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
          :alt="slotProps.data.image"
          class="border-round"
          style="width: 64px"
        />
        <div v-else-if="column.field === 'price'">
          {{formatCurrency(slotProps.data.price)}}
        </div>
        <Rating
          v-else-if="column.field === 'rating'"
          :modelValue="slotProps.data.rating"
          :readonly="true"
          :cancel="false"
        />
        <Tag
          v-else-if="column.field === 'inventoryStatus'"
          :value="slotProps.data.inventoryStatus"
          :severity="getStatusLabel(slotProps.data.inventoryStatus)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>