<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
</template>
<script>
import { mapAccion, mapActions } from 'vuex';
import Navbar from "./components/Navbar";

export default {
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(['cargarFirebase'])
  },
  created(){
    this.cargarFirebase()
  }
};
</script>