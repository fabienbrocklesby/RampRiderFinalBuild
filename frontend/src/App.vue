<template>
  <Navbar @SetPage="SetPage($event)" />
  <LandingPage v-if="openTab == 'LandingPage'" />
  <RegisterPage v-if="openTab == 'RegisterPage'" />
  <LoginPage v-if="openTab == 'LoginPage'" />
</template>

<script>
import Navbar from './components/Navbar.vue';
import LandingPage from './components/LandingPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import LoginPage from './components/LoginPage.vue';

export default {
  name: 'App',
  data() {
    return {
      openTab: 'LandingPage',
    };
  },
  components: {
    Navbar,
    LandingPage,
    RegisterPage,
    LoginPage,
  },
  methods: {
    SetPage(page) {
      this.openTab = page;
    },
  },
};
</script>

<style lang="scss">
</style>
