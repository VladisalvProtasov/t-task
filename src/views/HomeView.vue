<script setup lang="ts">

import DatePicker from 'primevue/datepicker';
import EditLink from '@/components/EditLink.vue';
import TableSearch from '@/components/TableSearch.vue'
import { computed, ref } from 'vue'

import MultiSelect from 'primevue/multiselect';

const time = ref <string> ('00:00');

const correctionDate = computed(() => {
  const d = new Date(time.value)
  return  typeof time.value === 'object' ? d.getHours() + ':' +  d.getMinutes() : time.value;
})

const selectModel = ref <[string?]> ([])
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);

function clearMultiSelect() {
  selectModel.value = [];
}
</script>

<template>
  <main style="display: flex; flex-direction: column; max-width: inherit">
    <h3>1. Поле Link</h3>
    <edit-link />
    <h3>2. DateTime picker</h3>
    {{'Значение переменной директивы v-model: ' + correctionDate}}
    <date-picker v-model="time" timeOnly/>
    <h3>3. Сброс значений в Select </h3>
    <multi-select
      v-model="selectModel"
      :options="cities"
      optionLabel="name"
      placeholder="Select Cities"
      display="chip"
      :showToggleAll="true"
    >
      <template #header>
        <div class="checkbox-all">
          All
        </div>
      </template>
      <template v-if="selectModel.length > 0" #dropdownicon>
        <i class="pi pi-times" @click.stop.prevent="clearMultiSelect"></i>
      </template>
    </multi-select>
    <h3>5. Таблица с поиском (расширенное задание)</h3>
    <table-search />
  </main>
</template>

<style scoped lang="scss">
h3 {
  color: #f8f8f8;
  padding: 20px 0 5px 0;
}
.checkbox-all {
  position: absolute;
  left: 45px;
  top: 6px;
}
</style>