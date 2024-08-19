<script setup lang="ts">

import InputGroup from 'primevue/inputgroup'
import InputText from 'primevue/inputtext'
import ListBox from 'primevue/listbox'
import Button from 'primevue/button'
import Popover from 'primevue/popover'
import { defineEmits, ref, toRefs } from 'vue'
import type { ColumnType, SearchElement } from '@/components/TableSearch/Modules'


const props = defineProps<{ columns: ColumnType[] }>();
const emits = defineEmits<{
  searchTable: [SearchElement]
}>()

const popover = ref()
const { columns } = toRefs(props);
const search = ref<string>('')
const targetColumn = ref<ColumnType>({} as ColumnType);

function clearSearch() {
  search.value = '';
  updateSearch();
}

function updateSearch() {
  emits('searchTable', {
    field: targetColumn.value.field,
    search: search.value}
  )
}

const toggle = (event: HTMLElement) => {
  popover.value.toggle(event);
};

</script>

<template>
 <div class="search">
   <InputGroup>
     <div class="search__settings">
       <Button
         icon="pi pi-sliders-v"
         severity="success"
         class="search__button"
         type="button"
         @click="toggle"
       >
       </Button>
       <Popover
         :unstyled="true"
         ref="popover"
       >
         <list-box
           v-model="targetColumn"
           :options="columns"
           optionLabel="header"
           class="w-full md:w-14rem search__list"
         />
       </Popover>
     </div>
     <div class="search__group">
       <InputText
         v-model="search"
         class="search__input"
         placeholder="Search table"
         @keydown.enter="updateSearch"
       />
       <i
         v-if="search.length"
         class="pi pi-times search__reset"
         @click.prevent="clearSearch"
       />
     </div>

     <Button
       label="Search"
       severity="info"
       @click="updateSearch"
     />
   </InputGroup>
 </div>
</template>

<style scoped lang="scss">
.search {
  &__settings,
  &__group {
    position: relative;
  }
  &__group,
  &__input {
    width: 100% !important;
  }
  &__reset {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
}
</style>