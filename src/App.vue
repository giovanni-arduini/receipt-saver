<template>
  <SideTab :folder-list="folderList" @add-folder="handleAddFolder" />
  <OcrAndAnalysis />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      folderList: [
        { name: "2024", id: 1, date: "2025-02-08", category: "Fatture" },
        { name: "Febbraio", id: 2, date: "2025-02-08", category: "Fatture" },
        { name: "Marzo", id: 3, date: "2025-02-08", category: "Fatture" },
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
  margin-top: 60px;
}
</style>
