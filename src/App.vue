<template>
  <div id="app" >
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from './components/layout/Header.vue';
  import Footer from './components/layout/Footer.vue';
  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer,
    },
  name: 'app',
  data () {
    return {

    }
  }
}
</script>

<style>
#app {

}
</style>
