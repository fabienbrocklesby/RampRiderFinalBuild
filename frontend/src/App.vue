<template>
  <Navbar @SetPage='SetPage($event)' :IsLoggedIn='this.isLoggedIn'/>
  <LandingPage v-if="openTab == 'LandingPage'" />
  <RegisterPage v-if="openTab == 'RegisterPage'" @SetPage='SetPage($event)' />
  <LoginPage v-if="openTab == 'LoginPage'" @IsLoggedIn='IsLoggedIn()' @SetPage='SetPage($event)'/>
  <ForgotPasswordPage v-if="openTab == 'ForgotPasswordPage'" @SetPage='SetPage($event)' />
  <UpdatePasswordPage v-if="openTab == 'UpdatePasswordPage'" @SetPage='SetPage($event)' />
  <ProfilePage v-if="openTab == 'ProfilePage'" @SetPage='SetPage($event)' @Logout='IsLoggedIn()' />
  <GetSkateparksPage v-if="openTab == 'GetSkateparksPage'" @SetPage='SetPage($event)' />
</template>

<script>
import Navbar from './components/Navbar.vue';
import LandingPage from './components/LandingPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import LoginPage from './components/LoginPage.vue';
import ForgotPasswordPage from './components/ForgotPasswordPage.vue';
import UpdatePasswordPage from './components/UpdatePasswordPage.vue';
import ProfilePage from './components/ProfilePage.vue';
import GetSkateparksPage from './components/GetSkateparksPage.vue';

export default {
  name: 'App',
  data() {
    return {
      openTab: 'LandingPage',
      isLoggedIn: false,
    };
  },
  components: {
    Navbar,
    LandingPage,
    RegisterPage,
    LoginPage,
    ForgotPasswordPage,
    UpdatePasswordPage,
    ProfilePage,
    GetSkateparksPage,
  },
  methods: {
    SetPage(page) {
      this.openTab = page;
    },
    IsLoggedIn() {
      if (window.localStorage.authToken) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
  },
  created() {
    if (window.localStorage.authToken) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
};
</script>

<style lang="scss">
</style>
