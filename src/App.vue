<template>
  <SideTab :folder-list="folderList" @save-folder="handleAddFolder" />
  <OcrAndAnalysis />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      folderList: [
        { name: "2024", id: 1 },
        { name: "Febbraio", id: 2 },
        { name: "Marzo", id: 3 },
      ],
    };
  },
  methods: {
    handleAddFolder(text) {
      const newFolder = { name: text, id: this.folderList.length + 1 };
      this.folderList.push(newFolder);
      console.log(this.folderList);
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
