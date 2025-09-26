<template>
  <div class='uploader-stage-table'>
    <v-table >
      <thead>
        <tr>
          <th class='text-left'>
            Nombre de Archivo
          </th>
          <th class='text-left'>
            Estado
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='item in fileList'
            :key='item.filePath'
        >
          <td>{{ item.filePath }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
  import type { FileReadingStatus } from '../models/FileReadingStatus';

  const props = defineProps({
    fileList: {
      type: Array as () => FileReadingStatus[],
      required: true,
    },
  });

</script>

<style scoped>
.uploader-stage-table {
  height: 100%;
  overflow-y: auto;
}
</style>

