<template>
  <div class="uploader">
    <div class="uploader__dropzone">
      <div>
        <h2 class="text-h6 font-weight-bold">Cargar CFDI</h2>
        <p class="text-grey-darken-1">Arrastra y suelta tus archivos XML o usa los botones para seleccionarlos. Formatos aceptados: CFDI v4.0</p>
      </div>
      <UploaderDropzone @handle-added-files="handleAddedFiles"/>
    </div>
    <div class="uploader__stage">
      <div class="uploader__stage-header">
        <h2>Lista de carga</h2>
        <div class="uploader__stage-content">
          <v-divider></v-divider>   
          <UploaderStageTable :file-list="fileUploadingList"/>
        </div>
      </div>
    </div>
    <div class="uploader__stage-actions">
      <v-btn color="primary"
             size="large"
             variant="elevated"
             :disabled="shouldDisableProcessingButton"
             @click="startProcessingFiles">Cargar Archivos</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import type { FileReadingStatus } from './models/FileReadingStatus';
  import UploaderStageTable from './components/UploaderStageTable.vue';
  import { useReceiptStore } from '@/stores/receiptStore';
  import UploaderDropzone from './components/UploaderDropzone.vue';

  const fileUploadingList = ref<FileReadingStatus[]>([]);
  const processingLimit = ref(5);
  
  const shouldDisableProcessingButton = computed(() => {
    return fileUploadingList.value.some(f => f.status === 'loading') || !fileUploadingList.value.some(f => f.status === 'pending');
  });

  function handleAddedFiles(files: File[], directoryHandle?: FileSystemDirectoryHandle) {
    const xmlFiles = files
      .filter(file => file.name.toLowerCase().endsWith('.xml'));

    const newFiles = xmlFiles
      .filter(file => !fileUploadingList.value.some(f => f.filePath === file.name))
      .map((file): FileReadingStatus => ({
        fileDirectory: directoryHandle?.name ?? 'dragged',
        filePath: file.name,
        status: 'pending',
        originalFile: file,
      }));

    fileUploadingList.value.push(...newFiles);
  }

  function startProcessingFiles() {

    const filesToProcess = fileUploadingList.value
      .filter(f => f.status === 'pending');

    filesToProcess.forEach(file => {
      file.status = 'loading';
    });

    // Process files.
    filesToProcess.forEach(file => {
      processFile(file);
    });
  }

  async function processFile(file: FileReadingStatus) {
    console.log("🚀 ~ processFile ~ file:", file);
    const formData = new FormData();

    // 'xmlFile' here MUST match the name expected by Formidable on the server
    formData.append('xmlFile', file.originalFile);
    try {
      // Use the native $fetch helper from Nuxt to call our API endpoint
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      
      // Store the parsed data from the server's response
      //parsedData.value = response.data;
      if(response.status === 200) {
        file.status = 'success';
        const receiptStore = useReceiptStore();
        receiptStore.addReceipt(responseData.parsedContent);
      }

    } catch (error: any) {
      console.log("🚀 ~ processFile ~ error:", error);
      file.status = 'error';
      file.message = error?.statusMessage || 'An unknown error occurred.';
    } finally {
      // Always turn off the loading indicator
      
    }

  }
</script>

<style scoped>
.uploader {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100vh;
  overflow: hidden;
}

.uploader__dropzone {
 display: flex;
 flex-direction: column;
 gap: 15px;
 flex-basis: 40%;
}

.uploader__stage {
 flex-basis:60%;
 width:100%;
 display: flex;
 flex-direction: column;
 gap: 20px;
 overflow:hidden;
}
.uploader__stage-header {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.uploader__stage-header h2 {
  height: 25px;
}

.uploader__stage-content {
 width:100%;
 height: calc(100% - 25px);
 display: flex;
 flex-direction: column;
 gap: 20px;
}

.uploader__stage-actions {
 width:100%;
 display: flex;
 justify-content: flex-end;
}
</style>