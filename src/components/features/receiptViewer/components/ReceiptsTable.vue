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

  const headers = ref<DataTableHeader[]>([
    {
      title: 'UUID',
      align: 'start',
      key: 'uuid',
      sortable: false,
    },
    {
      title: 'Fecha',
      align: 'start',
      key: 'date',
      sortable: false,
    },
    {
      title: 'Issuer',
      align: 'start',
      key: 'issuer',
      sortable: false,
    },
    {
      title: 'Type',
      align: 'start',
      key: 'type',
      sortable: false,
    },
    {
      title: 'Type',
      align: 'start',
      key: 'type',
      sortable: false,
    },
    {
      title: 'Subtotal',
      align: 'start',
      key: 'subtotal',
      sortable: false,
    },
    {
      title: 'Total',
      align: 'start',
      key: 'total',
      sortable: false,
    },
  ]);
  const items = ref([]);
  const search = ref('');

  
</script>


<style scoped>
.receipts-table {
    height: 100%;
}

</style>

