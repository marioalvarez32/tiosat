<template>
  <v-card variant="flat"
          class="receipt-card"
          
  >
    <v-card-title class="receipt-card__title">
      {{ label }}
    </v-card-title>
    <div class="receipt-card__value">
      {{ value }}
    </div>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue';

  defineProps({
    label: String,
    value: String,
  });
</script>


<style scoped>
.receipt-card {
    max-width: 344px;
    min-width: 250px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #eaf3ff;
}

.receipt-card__title {
    font-size: 1rem;
    color: #666;
}

.receipt-card__value {
    padding: 0.5rem 1rem;
    font-weight: 600;
    font-size: 1.1rem;
}
</style>
