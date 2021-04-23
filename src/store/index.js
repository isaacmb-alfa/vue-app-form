import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero:0
    },
    user: null,
    error: {tipo:null, mensaje: null}
  },
  /**
  **.##.....##.##.....##.########....###.....######..####..#######..##....##.########..######.
  **.###...###.##.....##....##......##.##...##....##..##..##.....##.###...##.##.......##....##
  **.####.####.##.....##....##.....##...##..##........##..##.....##.####..##.##.......##......
  **.##.###.##.##.....##....##....##.....##.##........##..##.....##.##.##.##.######....######.
  **.##.....##.##.....##....##....#########.##........##..##.....##.##..####.##.............##
  **.##.....##.##.....##....##....##.....##.##....##..##..##.....##.##...###.##.......##....##
  **.##.....##..#######.....##....##.....##..######..####..#######..##....##.########..######.
  */
  mutations: {
    setError(state, payload){
      if (payload === "EMAIL_NOT_FOUND") {
        return state.error = {tipo:'email', mensaje: 'Email no registrado'}
      }
    },
    setUser(state, payload){
      state.user = payload
    },
    cargar(state, payload){
      state.tareas = payload
    },
   set(state,payload){
     state.tareas.push(payload)
   },
   eliminar(state, payload){
     state.tareas = state.tareas.filter(item => item.id !== payload)
   },
   tarea(state, payload){
    let validacion = state.tarea = state.tareas.find(item => item.id === payload)
     if (!validacion) {
      router.push('/')
      return
     }
     validacion
     
   },
   update(state, payload){
     state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
     router.push('/')
   }
  },
 /**
 **....###.....######...######..####..#######..##....##.########..######.
 **...##.##...##....##.##....##..##..##.....##.###...##.##.......##....##
 **..##...##..##.......##........##..##.....##.####..##.##.......##......
 **.##.....##.##.......##........##..##.....##.##.##.##.######....######.
 **.#########.##.......##........##..##.....##.##..####.##.............##
 **.##.....##.##....##.##....##..##..##.....##.##...###.##.......##....##
 **.##.....##..######...######..####..#######..##....##.########..######.
 */
  actions: {
    cerrarSecion({commit}){
      commit('setUser', null)
      router.push('/registro')
      localStorage.removeItem('usuario')
    },
    async ingresoUser({ commit }, usuario){
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXv_xyVaUzpR6nJZeBYqI5NjznOOH6RZQ`,{
        method: 'POST',
        body: JSON.stringify({
          email: usuario.email,
          password: usuario.password,
          returnSecureToken: true
        })
      })
      const userDB = await res.json()

      if (userDB.error) {
        console.log(userDB.error);
        return commit('setError', userDB.error.message);
      }
      commit('setUser', userDB);
      router.push('/')
      localStorage.setItem('usuario', JSON.stringify(userDB))
      } catch (error) {
        console.log(error);
      }
    },
   async registrarUser({commit}, usuario){
    try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXv_xyVaUzpR6nJZeBYqI5NjznOOH6RZQ`,{
        method: 'POST',
        body: JSON.stringify({
          email: usuario.email,
          password: usuario.password,
          returnSecureToken: true
        })
      })
      const userDB = await res.json()
      if (userDB.error) {
        console.log(userDB.error);
        return
      }
      commit('setUser', userDB)
      router.push('/')
      localStorage.setItem('usuario', JSON.stringify(userDB))
    } catch (error) {
      console.log(error);
    }
    },
  async cargarFirebase({commit, state} ){
    if (localStorage.getItem('usuario')) {
      commit('setUser', JSON.parse(localStorage.getItem('usuario')))
    } else{
      return commit('setUser', null)
    }
       try {
         const res = await fetch(`https://udemy-api-e99ec.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
         const dataDB = await res.json()
         const arrayTareas = []
         for (let id in dataDB){
            arrayTareas.push(dataDB[id])
         }
         commit('cargar', arrayTareas)
       } catch (error) {
         console.log(error);
         
       }
    },
    async setTareas({commit, state}, tarea){
      try {
       const res =  await fetch(`https://udemy-api-e99ec.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        console.log(dataDB);
        
      } catch (error) {
        console.log(error);
        
      }
      commit('set', tarea)
    },
    async deleteTarea({commit, state}, id){
      try {
        await fetch(`https://udemy-api-e99ec.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
          method: 'DELETE',
        })
        commit('eliminar', id)
      } catch (error) {
        console.log(error);
      }
    },
    setTarea({commit}, id) {
      commit('tarea', id)
    },
    async updateTarea({commit, state}, tarea) {
      try {
        const res = await fetch(`https://udemy-api-e99ec.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        commit('update', tarea)        
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.user
    }
  },
  modules: {
  }
})
