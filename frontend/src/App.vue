<template>
  <div id="app">
    <!-- <GetSkateparks /> -->
    <!--  <RegisterForm /> -->
    <LoginForm />
  </div>
</template>

<script>
// import GetSkateparks from './components/GetSkateparks.vue';
// import RegisterForm from './components/RegisterForm.vue';
import LoginForm from './components/LoginForm.vue';

export default {
  name: 'App',
  components: {
    // GetSkateparks,
    // RegisterForm,
    LoginForm
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