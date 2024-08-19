<script setup lang="ts">

import MultiSelect from 'primevue/multiselect'
import type { ColumnType } from './Modules'
import { defineEmits, toRefs, computed } from 'vue'

const props = defineProps<{ modelValue: ColumnType[], options: ColumnType[] }>();
const emits = defineEmits<{
  'update:modelValue': [ColumnType[]]
}>()

const { modelValue, options } = toRefs(props)

const localModel = computed({
  get(): ColumnType[] {
    return modelValue.value;
  },
  set(value: ColumnType[]) {
    emits('update:modelValue', value);
  }
})

function clearMultiSelect() {
  localModel.value = [];
}

</script>

<template>
  <multi-select
    v-model="localModel"
    :options="options"
    optionLabel="header"
    placeholder="Select Columns"
    :showToggleAll="true"
  >
    <template #header>
      <div class="checkbox-all">
        All
      </div>
    </template>
    <template v-if="localModel.length > 0" #dropdownicon>
      <i class="pi pi-times" @click.stop.prevent="clearMultiSelect"></i>
    </template>
  </multi-select>
</template>

<style scoped lang="css">
.checkbox-all {
  position: absolute;
  left: 45px;
  top: 6px;
}
</style>