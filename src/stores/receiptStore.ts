import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Cfdi4 } from '../models/Cfdi4';

export const useReceiptStore = defineStore('receiptStore', () => {
  const receipts = ref<Cfdi4[]>([]);


  function addReceipt(receipt: Cfdi4) {
    receipts.value.push(receipt);
  }
  
  return { 
    receipts,
    addReceipt,
  };
});