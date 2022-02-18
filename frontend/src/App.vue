<template>
  <div id="app">
    <!-- <GetSkateparks /> -->
    <!--  <RegisterForm /> -->
    <!-- <ForgotPassword /> -->
    <!--  <UpdatePassword /> -->
    <!-- <GetMe /> -->
    <GetSkatepark @postId="setPostId($event)"/>
    <CreateReview :postData="this.postId" />
    <AddSkatepark style="padding-top: 100px" />
    <LoginForm style="padding-top: 100px" />
  </div>
</template>

<script>
// import GetSkateparks from './components/GetSkateparks.vue';
// import RegisterForm from './components/RegisterForm.vue';
import LoginForm from './components/LoginForm.vue';
// import ForgotPassword from './components/ForgotPassword.vue';
// import UpdatePassword from './components/UpdatePassword.vue';
// import GetMe from './components/GetMe.vue';
import AddSkatepark from './components/AddSkatepark.vue';
import GetSkatepark from './components/GetSkatepark.vue';
import CreateReview from './components/CreateReview.vue';

export default {
  name: 'App',
  data() {
    return {
      postId: '',
    }
  },
  components: {
    // GetSkateparks,
    // RegisterForm,
    LoginForm,
    // ForgotPassword,
    // UpdatePassword,
    // GetMe,
    AddSkatepark,
    GetSkatepark,
    CreateReview,
  },
  methods: {
    setPostId(postId) {
      this.postId = postId;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>