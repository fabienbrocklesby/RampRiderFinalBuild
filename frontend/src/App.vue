<template>
  <div class="page">
    <Navbar @SetPage='SetPage($event)' :IsLoggedIn='this.isLoggedIn'/>
    <LandingPage v-if="openTab == 'LandingPage'" />
    <RegisterPage v-if="openTab == 'RegisterPage'" @SetPage='SetPage($event)' />
    <LoginPage v-if="openTab == 'LoginPage'" @IsLoggedIn='IsLoggedIn()' @SetPage='SetPage($event)'/>
    <ForgotPasswordPage v-if="openTab == 'ForgotPasswordPage'" @SetPage='SetPage($event)' />
    <UpdatePasswordPage v-if="openTab == 'UpdatePasswordPage'" @SetPage='SetPage($event)' />
    <ProfilePage v-if="openTab == 'ProfilePage'" @SetPage='SetPage($event)' @Logout='IsLoggedIn()' />
    <GetSkateparksPage v-if="openTab == 'GetSkateparksPage'" @SetPage='SetPage($event)' @FindMore="FindSkateparkById($event)" :IsLoggedIn='this.isLoggedIn'/>
    <GetSkateparkPage v-if="openTab == 'GetSkateparkPage'" @SetPage='SetPage($event)' :id="this.postId"/>
    <AddSkateparkPage v-if="openTab == 'AddSkateparkPage'" @SetPage='SetPage($event)' @IsLoggedIn='IsLoggedIn()'/>
  </div>
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
import GetSkateparkPage from './components/GetSkateparkPage.vue';
import AddSkateparkPage from './components/AddSkateparkPage.vue';

export default {
  name: 'App',
  data() {
    return {
      openTab: 'LandingPage',
      isLoggedIn: false,
      postId: '',
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
    GetSkateparkPage,
    AddSkateparkPage,
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
    FindSkateparkById(id) {
      this.postId = id;
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
  .page {
        animation: fadeInAnimation ease .5s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    }
    @keyframes fadeInAnimation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
