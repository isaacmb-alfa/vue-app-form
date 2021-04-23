<template>
  <div class="my-5">
<h1 class="font-weight-bold text-primary">Ingreso de Usuario</h1>
<div class="alert alert-danger" v-if="error.tipo !== null">
    {{ error.mensaje }}
</div>
    <form @submit.prevent="procesarForm">
        <h3 class="font-weight-bold text-success">Introduce tus datos</h3>
        <h4 class="text-secondary">Coloca un mail valido</h4>
      <input class="form-control my-2" type="email" placeholder="email" v-model.trim="email" :class="[error.tipo === 'email'? 'is-invalid': '']"/>
      <h4 class="text-secondary">Coloca un password que no contenga espacios</h4>
      <input class="form-control my-2" type="password" placeholder="password" v-model.trim="pass1" />
      <button class="btn btn-primary" type="submit" :disabled="bloquear">Ingresar</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            email: '',
            pass1: '',
        }
    },
    computed: {
        ...mapState(['error']),
        bloquear(){
            if (!this.email.includes('@')) {
                return true
            }
            if (this.pass1.length >=6 ) {
                return false
            }
            return true
        }
    },
    methods: {
        ...mapActions(['ingresoUser']),
        procesarForm(){
            this.ingresoUser({email: this.email, password: this.pass1})
            this.email = '';
            this.pass1 = '';
        }
    },
};
</script>