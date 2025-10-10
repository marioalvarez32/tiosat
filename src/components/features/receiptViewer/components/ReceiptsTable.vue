<template>
  <v-data-table :headers="headers"
                :items="items"
                :search="search"
                class="receipts-table"
  ></v-data-table>
</template>


<script setup lang="ts">
  import { ref } from 'vue';
  import type { DataTableHeader } from 'vuetify';

  const props = defineProps({
    items: {
      type: Array,
      required: true
    },
    search: {
      type: String,
      default: ''
    }
  });

  const headers = ref<DataTableHeader[]>([
    {
      title: 'Folio',
      align: 'start',
      key: 'Folio',
      sortable: false,
    },
    {
      title: 'Fecha',
      align: 'start',
      key: 'Fecha',
      sortable: false,
    },
    {
      title: 'Subtotal',
      align: 'start',
      key: 'SubTotal',
      sortable: false,
    },
    {
      title: 'Total',
      align: 'start',
      key: 'Total',
      sortable: false,
    },
  ]);
  
</script>


<style scoped>
.receipts-table {
    height: 100%;
}

</style>

