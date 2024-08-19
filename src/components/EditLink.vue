<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { ref } from 'vue'

const value = ref <string | undefined> ('')
const titleLink = ref <string | undefined> ('')
let show = ref<boolean>(true)

async function changeComponent() {
  if (value.value) {
    show.value = false;
    await fetch('https://cors-anywhere.herokuapp.com/' + value.value)
      .then(async (res) => {
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        titleLink.value = doc?.querySelector('title')?.innerText;
      });
  }
}

</script>

<template>
  <div class="edit-link">
    <InputText
      v-if="show"
      type="text"
      v-model="value"
      placeholder="https://"
      @focusout="changeComponent"
    />
    <div
      v-if="!show"
      style="padding: 0 10px"
      class="edit-link__block"
    >
      <a
        :href="value"
        target="_blank"
        style="margin-right: 5px"
      >
        {{ titleLink || "Загрузка..." }}
      </a>
      <i
        class="pi pi-pencil edit-link__icon"
        style="cursor: pointer"
        @click="show = true"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.edit-link {
  &__block {
    &:hover {
      .edit-link__icon {
        display: initial;
      }
    }
  }
  &__icon {
    display: none;
  }
}
</style>