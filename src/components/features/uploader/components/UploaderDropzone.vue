<template>
  <v-file-upload v-model="draggedFiles" class="uploader-dropzone" density="default">
    <template #icon>
    </template>
    <template #title>
     
    </template>
    <template #divider>
      <div class="uploader-dropzone__content">
        <v-icon icon="mdi-cloud-upload-outline" size="40px" color="grey-darken-1"></v-icon>
        <p class="text-subtitle-1 text-grey-darken-1" >Arrastra y suelta tus archivos XML o selecciona directorio.</p>
        <v-btn prepend-icon="mdi-folder-open-outline"
               color="primary"
               size="large"
               variant="elevated"
               @click="openDirectoryPicker">Seleccionar directorio</v-btn>
        <div class="uploader-dropzone__content-info">
          <v-icon icon="mdi-shield-check-outline" size="20px" color="grey-darken-1"></v-icon>
          <p class="text-subtitle-3 text-grey-darken-1">Tus archivos permanecen en tu computadora hasta que confirmes la carga.</p>
        </div>
      </div>
    </template>
    <template #browse>
    </template>
    <template #default>
      hello default
    </template>
    
    <template #item></template>
  </v-file-upload>
</template>


<script setup lang="ts">
  import { ref, watch } from 'vue';


  const emit = defineEmits(['handle-added-files']);
  const draggedFiles = ref<File[]>([]);

  watch(draggedFiles, () => {
    // check if file is in fileUPloadingList
    emitHandleAddedFiles(draggedFiles.value);
  });


  async function openDirectoryPicker() {
    try {
      const directoryHandle = await window.showDirectoryPicker();
      const files = await getFilesFromDirectory(directoryHandle);
      emitHandleAddedFiles(files, directoryHandle);
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


  function emitHandleAddedFiles(files: File[], directoryHandle?: FileSystemDirectoryHandle) {
    emit('handle-added-files', files, directoryHandle);
  }

</script>

<style>
.uploader-dropzone {
    background-color: #eaf3ff;
    height: 275px;
}

.uploader-dropzone__content {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.uploader-dropzone__content-info {
    display: flex;
    align-items: center;
    gap: 5px;
}

:deep(.v-sheet.v-theme--light.v-file-upload) {
    background-color: red !important;
}
</style>
