<template>
  <div class="grid grid-cols-5 grid-rows-5 gap-0 min-h-screen">
    <SideTab :folder-list="folderList" @add-folder="handleAddFolder" />
    <OcrAndAnalysis @add-file="handleAddFile" />
    <MainList :files="filesList" />
    <SummaryGraph :files="filesList" />
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
          boughtFrom: "farmacia",
          id: 1,
          date: "2025-02-01",
          category: "Ricetta",
          number: 456,
          payed: 20,
          special: false,
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
