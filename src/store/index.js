import { createStore } from 'vuex'
import router from '../router';

export default createStore({
  state: {
    user: null,
    sppiner: false,
    alert: false,
    error: false
  },
  mutations: {
    viewUser(state) {
      console.log(state.user);
    },
    setUser(state, payload) {
      state.user = payload
    },
    setSpinner(state) {
      state.sppiner = true;
    },
    removeSpinner(state) {
      state.sppiner = false;
    },
    setError(state) {
      state.error = true;
    },
    removeError(state) {
      state.error = false;
    }

    

  },
  actions: {
    async ingresarUsuario({commit}, dataUser) {
      //Inicializamos el spinner
      commit('setSpinner');

      //LogIn
      const API = 'http://localhost:3000/login';
      
      // console.log(dataUser);
      try {
          const response = await fetch(API, {
            method: 'POST',
            body: JSON.stringify(dataUser),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          // console.log(data[0]);

          //Quitamos el spinner
          commit('removeSpinner');

          if(!data[0]) {
            
            //Indicamos que hay un error en las credenciales
            commit('setError');
            return;
          }

          //Qitamos el error y asiganamos al usuraio
          commit('removeError');
          commit('setUser', data[0]);
          router.push('/');
          // commit('viewUser');

      } catch (error) {
          console.log(error);
      }

      

    },
    cerrarSesion({commit}) {

      commit('setUser', null);
      router.push('/login');
    }
  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.user;
    },
    viewSpinner(state) {
      return state.sppiner;
    },
    getError(state) {
      return state.error;
    }
  },
  modules: {
  }
})
