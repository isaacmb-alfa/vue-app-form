<template>
  <div class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Formularios</router-link>
      <div class="d-flex">
          <router-link to="/" class="btn btn-dark" v-if="usuarioAutenticado">Tareas</router-link>
          <router-link to="/registro"> <button class="btn btn-dark" v-if="!usuarioAutenticado">Registro</button></router-link>
          <router-link to="/ingreso" ><button class="btn btn-dark" v-if="!usuarioAutenticado">Ingreso</button></router-link>
          <button @click="cerrarSecion" v-if="usuarioAutenticado" class="btn btn-warning btn-sm">Cerrar Seción</button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['usuarioAutenticado'])
  },
  methods: {
    ...mapActions(['cerrarSecion'])
  },
};
</script>

<style>
</style>