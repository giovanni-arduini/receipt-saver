import { reactive, computed, watch, onMounted } from "vue";
import axios from "axios";

const API_URL = "http://localhost:5001/api/items";

const state = reactive({
  folderList: [
    {
      name: "2024",
      id: 1,
      date: "2025-02-08",
      category: "Fatture",
      content: [],
    },
    {
      name: "Febbraio",
      id: 2,
      date: "2025-03-08",
      category: "Fatture",
      content: [],
    },
    {
      name: "Marzo",
      id: 3,
      date: "2025-06-08",
      category: "Fatture",
      content: [],
    },
  ],
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

  async function loadFiles() {
    try {
      const res = await axios.get(API_URL);
      state.filesList = res.data;
    } catch (err) {
      console.error("Errore caricamento file:", err);
    }
  }

  onMounted(() => {
    loadFiles();
  });

  async function addNewFile(newFile) {
    try {
      const res = await axios.post(API_URL, newFile);
      state.filesList.push(res.data);
    } catch (err) {
      console.error("Errore creazione file:", err);
    }
  }

  async function updateFile(id, updatedFields) {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedFields);
      const index = state.filesList.findIndex((f) => f.id === id);
      if (index !== -1) state.filesList[index] = res.data;
    } catch (err) {
      console.error("Errore aggiornamento file:", err);
    }
  }

  async function deleteFile(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      state.filesList = state.filesList.filter((f) => f.id !== id);
    } catch (err) {
      console.error("Errore eliminazione file:", err);
    }
  }

  function toggleSpecial(fileId) {
    const file = state.filesList.find((f) => f.id === fileId);
    if (file) updateFile(fileId, { special: !file.special });
  }

  async function deleteFolder(id) {
    state.folderList = state.folderList.filter((folder) => folder.id !== id);
    const filesToUpdate = state.filesList.filter((f) => f.folderId === id);
    await Promise.all(
      filesToUpdate.map((file) => updateFile(file.id, { folderId: null }))
    );
  }

  // watch per osservare ogni cambiamento
  watch(
    () => state.filesList,
    (newVal) => console.log("filesList cambiata:", newVal),
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
