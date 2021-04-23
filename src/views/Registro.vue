<template>
  <div class="my-5">
    <h1 class="font-weight-bold text-primary">Registro de Usuarios</h1>
    <form @submit.prevent="procesarForm">
        <h3 class="font-weight-bold text-success">Introduce tus datos</h3>
        <h4 class="text-secondary">Coloca un mail valido</h4>
      <input class="form-control my-2" type="email" placeholder="email" v-model.trim="email"/>
      <h4 class="text-secondary">Coloca un password que no contenga espacios</h4>
      <input class="form-control my-2" type="password" placeholder="password" v-model.trim="pass1" />
      <input class="form-control my-2" type="password" placeholder="Repite tu password" v-model.trim="pass2" />
      <button class="btn btn-primary" type="submit" :disabled="bloquear">Registrar</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    },
    computed: {
        bloquear(){
            if (!this.email.includes('@')) {
                return true
            }
            if (this.pass1.length >=6 && this.pass1 === this.pass2) {
                return false
            }
            return true
        },
        passWord(){
            
        }
    },
    methods: {
        ...mapActions(['registrarUser']),
        procesarForm(){
            this.registrarUser({email: this.email, password: this.pass1})
            this.email = '';
            this.pass1 = '';
            this.pass2 = '';
        }
    },
};
</script>