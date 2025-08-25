import axios from "axios";
import { onMounted } from "vue";

import { reactive, computed } from "vue";

const API_URL = "http://localhost:5001/api";

const state = reactive({
  folderList: [],
  activeFilter: null,
});

console.log(state.folderList);

export function useFolders() {
  async function loadFolders() {
    try {
      const res = await axios.get(API_URL + "/folders");
      state.folderList = res.data;
      console.log("Loaded folders:", state.folderList);
    } catch (err) {
      console.error("Errore caricamento cartelle", err);
    }
  }

  onMounted(() => {
    loadFolders();
  });

  async function addNewFolder(newFolder) {
    try {
      await axios.post(API_URL + "/folders", newFolder);
      await loadFolders();
      //   state.folderList.push(res.data);
    } catch (err) {
      console.error("Errore creazione della cartella:", err);
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

  return {
    folderList: computed(() => state.folderList),
    loadFolders,
    addNewFolder,
    deleteFolder,
  };
}
