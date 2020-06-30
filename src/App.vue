<template>
  <div id="app">
    <AlertBox ref="App-AlertBox"/>

    <MainMenu ref="MainMenu"/>

    <router-view @ResetAlertBox="resetAlertBox" @UpdateAlertBox="updateAlertBox" class="mb-5"/>
  </div>
</template>

<script>
import AlertBox from "./components/AlertBox";
import MainMenu from "./components/MainMenu";

export default {
  name: 'App',
  methods: {
    addNotLoggedInEventListener() {
      document.addEventListener('NotLoggedIn', () => {
        if (this.$route.name !== 'Login') {
          this.$router.push({name: 'Login', query: {path: this.$route.fullPath}})
        }

        localStorage.removeItem("user");
        this.$refs["MainMenu"].getUser();
      });
    },
    resetAlertBox() {
      this.$refs['App-AlertBox'].reset();
    },
    updateAlertBox(variant, text) {
      this.$refs['App-AlertBox'].update(variant, text);
    },
    created() {
      this.addNotLoggedInEventListener();
    }
  },
  components: {
    AlertBox,
    MainMenu
  }
}
</script>

<style>

</style>
