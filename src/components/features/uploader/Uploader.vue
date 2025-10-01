<template>
  <div class='uploader'>
    <div class='uploader__dropzone'>
      <h1>Cargar CFDI</h1>
      <v-file-upload v-model='draggedFiles' density='default'>
        <template #browse>
          <v-btn color='primary' size='large' variant='elevated' @click='openDirectoryPicker'>Seleccionar directorio</v-btn>
        </template>
        <template #item></template>
      </v-file-upload>
    </div>
    <div class='uploader__stage'>
      <div class='uploader__stage-header'>
        <h2>Lista de carga</h2>
        <div class='uploader__stage-content'>
          <v-divider></v-divider>   
          <UploaderStageTable :file-list='fileUploadingList'/>
        </div>
      </div>
    </div>
    <div class='uploader__stage-actions'>
      <v-btn color='primary'
             size='large'
             variant='elevated'
             :disabled='shouldDisableProcessingButton'
             @click='startProcessingFiles'>Cargar Archivos</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import type { FileReadingStatus } from './models/FileReadingStatus';
  import UploaderStageTable from './components/UploaderStageTable.vue';

  const selectedFileDirectory = ref<FileSystemDirectoryHandle | null>(null);
  const fileUploadingList = ref<FileReadingStatus[]>([]);
  const processingLimit = ref(5);
  const draggedFiles = ref<File[]>([]);
  
  const shouldDisableProcessingButton = computed(() => {
    return fileUploadingList.value.some(f => f.status === 'loading') || !fileUploadingList.value.some(f => f.status === 'pending');
  });

  async function openDirectoryPicker() {
    try {
      const directoryHandle = await window.showDirectoryPicker();
      const files = await getFilesFromDirectory(directoryHandle);
      handleAddedFiles(files, directoryHandle);
    }
    catch (error) {
      // The user canceled the dialog, so we can safely ignore the error.
      if (error.name !== 'AbortError') {
        console.error('Error reading directory:', error);
      }
    }
  }

  async function getFilesFromDirectory(directoryHandle: FileSystemDirectoryHandle): Promise<File[]> {
    const files: File[] = [];
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === 'file') {
        const file = await entry.getFile();
        files.push(file);
      }
    }
    return files;
  }

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
    const parsedData = ref<any>(null);
    try {
      // Use the native $fetch helper from Nuxt to call our API endpoint
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      console.log("🚀 ~ processFile ~ response:", response);

      // Store the parsed data from the server's response
      //parsedData.value = response.data;
      if(response.status === 'success') {
        file.status = 'success';
      }

    } catch (error: any) {
      console.log("🚀 ~ processFile ~ error:", error);
      file.status = 'error';
      file.message = error?.statusMessage || 'An unknown error occurred.';
    } finally {
      // Always turn off the loading indicator
      
    }

  }

  watch(draggedFiles, () => {
    // check if file is in fileUPloadingList
    handleAddedFiles(draggedFiles.value);
  });
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
 gap: 20px;
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