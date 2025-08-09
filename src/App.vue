<template>
  <div class="grid grid-cols-5 grid-rows-5 gap-0 min-h-screen">
    <SideTab :folder-list="folderList" @add-folder="handleAddFolder" />
    <OcrAndAnalysis @add-file="handleAddFile" />
    <MainList :files="filesList" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      folderList: [
        { name: "2024", id: 1, date: "2025-02-08", category: "Fatture" },
        { name: "Febbraio", id: 2, date: "2025-03-08", category: "Fatture" },
        { name: "Marzo", id: 3, date: "2025-06-08", category: "Fatture" },
      ],
      filesList: [
        {
          name: "Dibase",
          bougthFrom: "farmacia",
          id: 1,
          date: "2025-02-01",
          category: "Ricetta",
          number: 456,
          payed: "20€",
        },
        {
          name: "Robilas",
          bougthFrom: "farmacia",
          id: 2,
          date: "2025-01-01",
          category: "Ricetta",
          number: 234,
          payed: "11€",
        },
        {
          name: "Finestre",
          bougthFrom: "Serramenti SRL",
          id: 3,
          date: "2025-02-01",
          category: "Fattura",
          number: 123,
          payed: "1100€",
        },
      ],
    };
  },

  methods: {
    handleAddFolder(name, date, category) {
      const newFolder = {
        name: name,
        id: this.folderList.length + 1,
        category: category,
        date: date,
      };
      this.folderList.push(newFolder);
      console.log(this.folderList);
      console.log(newFolder);
    },

    handleAddFile(obj) {
      this.filesList.push(obj);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
