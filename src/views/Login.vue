<template>
  <div id="login" class= "m-0 vh-100 row justify-content-center align-items-center">
    <div class="col-auto">
      <div class="row rounded animate__animated animate__backInDown animate__slow">
        <div class="col-md-6">
          <img src="@/assets/img/login.png" alt="login" class="img-fluid">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Usuario" aria-label="Usuario" v-model="user">
          </div>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Contraseña" aria-label="Contraseña" v-model="password">
          </div>
          <button type="submit" class="btn btn-info" :disabled="bloquear" @click="ingresarUsuario({user, password})">Acceder</button>
          <div class="alert alert-danger mt-3" role="alert" v-if="getError">
            Revisa las credenciales
            {{getError}}
          </div>
        </div>
      </div>
      <div class="spinner-border mt-5" role="status" v-if="viewSpinner">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import 'animate.css'
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      user: "",
      password: "",
    }
  },
  computed: {
    ...mapGetters(['usuarioAutenticado','viewSpinner', 'getError']),
    bloquear(){
      return (this.user == "" || this.password == "") ? true : false;
    }
  },
  methods: {
    ...mapActions(['ingresarUsuario']),
    
  },
  

}
</script>

<style>

</style>