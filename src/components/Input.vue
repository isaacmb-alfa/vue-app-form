<template>
      <input
        type="text"
        class="form-control my-2"
        placeholder="Ingrese Nombre"
        v-model.trim="tarea.nombre"
      />
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="check-1"
          v-model="tarea.categorias"
          value="javascript"
        />
        <label class="form-check-label" for="check-1">JavaScript</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="check-2"
          v-model="tarea.categorias"
          value="nodejs"
        />
        <label class="form-check-label" for="check-2">NodeJs </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          class="form-check-input"
          id="radius-1"
          value="urgente"
          v-model="tarea.estado"
        />
        <label for="radius-1" class="form-check-label">Urgente </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          class="form-check-input"
          id="radius-2"
          value="ordinario"
          v-model="tarea.estado"
        />
        <label for="radius-2" class="form-check-label">Ordinario</label>
      </div>
      <div class="mt-2">
        <input type="number" v-model.number="tarea.numero" class="form-control">
      </div>
      <div class="my-3">
      <button 
      class="btn btn-dark btn-block" 
      type="submit"
      :disabled="desBot">Procesar</button>
      </div>
</template>

<script>
export default {
    props: {
        tarea: Object,
    },
     computed: {
    desBot(){
      return this.tarea.nombre.trim() === "" ?  true : false
      }
    }

}
</script>
