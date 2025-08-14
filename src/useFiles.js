// src/composables/useFiles.js
import { reactive, computed } from "vue";

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

  filesList: [
    {
      name: "Dibase",
      boughtFrom: "farmacia",
      id: 1,
      date: "2025-02-01",
      category: "Ricetta",
      number: 456,
      payed: 20,
      special: false,
      folderId: null,
    },
    {
      name: "Robilas",
      boughtFrom: "farmacia",
      id: 2,
      date: "2025-01-01",
      category: "Ricetta",
      number: 234,
      payed: 11,
      special: true,
      folderId: 1,
    },
    {
      name: "Finestre",
      boughtFrom: "Serramenti SRL",
      id: 3,
      date: "2025-02-01",
      category: "Fattura",
      number: 123,
      payed: 1100,
      special: false,
      folderId: null,
    },
    {
      name: "Cicci",
      boughtFrom: "farmacia",
      id: 5,
      date: "2024-02-01",
      category: "Fattura",
      number: 456,
      payed: 20,
      special: true,
      folderId: null,
    },
    {
      name: "Picci",
      boughtFrom: "farmacia",
      id: 7,
      date: "2024-02-01",
      category: "Ricetta",
      number: 324234,
      payed: 34,
      special: false,
      folderId: 1,
    },
    {
      name: "Gigi",
      boughtFrom: "farmacia",
      id: 8,
      date: "2023-02-01",
      category: "Ricetta",
      number: 23543,
      payed: 55,
      special: false,
      folderId: null,
    },
  ],
  activeFilter: null, // "special" | folderId | null
});

const filteredFiles = computed(() => {
  if (state.activeFilter === "special") {
    return state.filesList.filter((f) => f.special);
  }

  if (typeof state.activeFilter === "number") {
    return state.filesList.filter((f) => f.folderId === state.activeFilter);
  }

  if (state.activeFilter === "current") {
    const currentYear = new Date().getFullYear();
    return state.filesList.filter(
      (f) => new Date(f.date).getFullYear() === currentYear
    );
  }
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

  function toggleSpecial(fileId) {
    const file = state.filesList.find((f) => f.id === fileId);
    if (file) {
      file.special = !file.special;
    }
  }

  function addNewFile(newFile) {
    state.filesList = [...state.filesList, newFile];
  }

  function deleteFolder(id) {
    state.folderList = state.folderList.filter((folder) => folder.id !== id);
  }

  return {
    state,
    filteredFiles,
    activeSectionName,
    setFilter,
    addNewFile,
    toggleSpecial,
    deleteFolder,
  };
}
