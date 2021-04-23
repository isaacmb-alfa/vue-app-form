<template>
  <div class="container">
      <h1 class="font-weight-bold text-primary">Formularios</h1>
      <form @submit.prevent="procesarForm">
        <Input :tarea="tarea"/>
      </form>
      <ListaTareas/>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from '../components/Input'  
import ListaTareas from '../components/ListaTareas'  
import { mapActions } from 'vuex' 
const shortid = require('shortid');

export default {
  name: "Home",
  components: {
    Input,
    ListaTareas
  },
  data() {
    return {
      texto: '',
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero:0
      },
    };
  },
  methods: {
    ...mapActions(['setTareas', 'cargarFirebase']),
    procesarForm() {

      if(this.tarea.nombre.trim()=== ""){

        return
      }

      //generar id
      let userID = this.tarea.id = shortid.generate()

      // enviar los datos
      this.setTareas(this.tarea )

      // enviar datos
      this.tarea = {
        id: '',
         nombre: '',
        categorias: [],
        estado: '',
        numero:0
      }
    }
  },
  created(){
    this.cargarFirebase()
  }
 
};
</script>
