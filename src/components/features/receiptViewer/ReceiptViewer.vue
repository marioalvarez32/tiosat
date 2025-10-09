<template>
  <div class="receipts">
    <div class="receipts__header">
      <div class="receipts__header-title">
        <h2>Recibos</h2>
        <p>Maneja tus Ingresos, Egresos, y CFDIs</p>
      </div>
      <div class="receipts__header-actions">
        <v-btn-toggle v-model="selectedView" color="primary" mandatory disabled>
          <v-btn :value="ReceiptsViews.INGRESOS">
            Ingresos
          </v-btn>

          <v-btn :value="ReceiptsViews.EGRESOS">
            Egresos
          </v-btn>

          <v-btn :value="ReceiptsViews.CFDIS">
            CFDIs
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>
    <div class="receipts__summary">
      <ReceiptCard label="Receipts"
                   value="850"
      />
      <ReceiptCard label="Total"
                   value="$3,850"
      />
      <ReceiptCard label="Revisar"
                   value="15"
      />
    </div>
    <v-sheet class="receipts__action-bar">
      <v-text-field class="receipts__action-bar__search"
                    append-inner-icon="mdi-magnify"
                    density="compact"
                    label="Buscar ingreso por Folio, UUID, RFC"
                    variant="solo-filled"
                    hide-details
                    single-line
                    clearable
      ></v-text-field>

      <v-btn prepend-icon="mdi-filter-outline">
        Filter
      </v-btn>
      <v-btn prepend-icon="mdi-layers-triple-outline">
        Group
      </v-btn>
    </v-sheet>
    <v-sheet class="receipts__table">
      <ReceiptsTable />
    </v-sheet>

  </div>
</template>


<script setup lang="ts">
  import { ref } from 'vue';
  import { ReceiptsViews } from './enums/ReceiptsViews';
  import ReceiptCard from './components/ReceiptCard.vue';
  import ReceiptsTable from './components/ReceiptsTable.vue';

  const selectedView = ref(ReceiptsViews.INGRESOS);
</script>

<style scoped>
.receipts {
    height: 100vh;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.receipts__header{
    display: flex;
    justify-content: space-between;
}


.receipts__header-title{
    display: flex;
    align-items: center;
    gap: 10px;
}

.receipts__header-title h2 {
    font-weight: bold;
}

.receipts__header-title p {
    font-size: 14px;
    color: #666;
}

.receipts__summary {
    display: flex;
    gap: 30px;
}

.receipts__action-bar {
    padding: 20px;
    background-color: #eaf3ff;
    display: flex;
    align-items: center;
    gap:15px;
}

.receipts__action-bar__search {
    max-width:350px;
}

.receipts__table {
    flex: 1;
}
</style>
