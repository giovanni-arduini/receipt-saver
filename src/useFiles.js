import { reactive, computed, watch, onMounted } from "vue";
import axios from "axios";

const API_URL = "http://localhost:5001/api";

const state = reactive({
  folderList: [],
  filesList: [],
  activeFilter: null,
});

const filteredFiles = computed(() => {
  if (state.activeFilter === "special")
    return state.filesList.filter((f) => f.special);
  if (typeof state.activeFilter === "number")
    return state.filesList.filter((f) => f.folderId === state.activeFilter);
  if (state.activeFilter === "current") {
    const currentYear = new Date().getFullYear();
    return state.filesList.filter(
      (f) => new Date(f.date).getFullYear() === currentYear
    );
  }
  console.log(filteredFiles);
  return state.filesList;
});

const activeSectionName = computed(() => {
  if (state.activeFilter === "special") return "Preferiti";
  if (state.activeFilter === "current") return "Anno corrente";
  if (typeof state.activeFilter === "number") {
    const folder = state.folderList.find((f) => f.id === state.activeFilter);
    return folder ? folder.name : "";
  }
  return "Tutti i file";
});

export function useFiles() {
  function setFilter(filter) {
    state.activeFilter = filter;
  }

  async function loadFolders() {
    try {
      const res = await axios.get(API_URL + "/folders");
      state.folderList = res.data;
    } catch (err) {
      console.error("Errore caricamento cartelle", err);
    }
  }

  async function loadFiles() {
    try {
      const res = await axios.get(API_URL + "/files");
      state.filesList = res.data;
    } catch (err) {
      console.error("Errore caricamento file:", err);
    }
  }

  onMounted(() => {
    loadFiles();
    loadFolders();
  });

  async function addNewFile(newFile) {
    try {
      const res = await axios.post(API_URL + "/files", newFile);
      await loadFiles();
      state.filesList.push(res.data);
    } catch (err) {
      console.error("Errore creazione file:", err);
    }
  }

  async function updateFile(id, updatedFields) {
    try {
      const res = await axios.put(`${API_URL}/files/${id}`, updatedFields);
      const index = state.filesList.findIndex((f) => f.id === id);
      await loadFiles();

      if (index !== -1) state.filesList[index] = res.data;
    } catch (err) {
      console.error("Errore aggiornamento file:", err);
    }
  }

  async function deleteFile(id) {
    try {
      await axios.delete(`${API_URL}/files/${id}`);
      await loadFiles();

      state.filesList = state.filesList.filter((f) => f.id !== id);
    } catch (err) {
      console.error("Errore eliminazione file:", err);
    }
  }

  async function deleteFolder(id) {
    try {
      await axios.delete(`${API_URL}/folders/${id}`);
      await loadFolders();
      // state.folderList = state.folderList.filter((f) => f.id !== id);
    } catch (err) {
      console.error("Errore durante l'eliminazione della cartella", err);
    }
  }

  function toggleSpecial(fileId) {
    const file = state.filesList.find((f) => f.id === fileId);
    if (file) updateFile(fileId, { special: !file.special });
  }
  // watch per osservare ogni cambiamento
  watch(
    [() => state.filesList, () => state.folderList],
    ([newFiles, newFolders]) => {
      console.log("filesList cambiata:", newFiles);
      console.log("folderList cambiata:", newFolders);
    },
    { deep: true }
  );

  return {
    state,
    filteredFiles,
    activeSectionName,
    setFilter,
    loadFiles,
    addNewFile,
    updateFile,
    deleteFile,
    toggleSpecial,
    deleteFolder,
  };
}
