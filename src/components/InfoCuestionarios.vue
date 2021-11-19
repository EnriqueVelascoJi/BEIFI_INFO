<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand"></a>
      <form class="d-flex" @submit.prevent="cerrarSesion">
        <button class="btn btn-danger" type="submit">Cerrar Sesión</button>
      </form>
    </div>
  </nav>
  <div class="container mt-5">
    <h1 class="mt-5 mb-5">Información Cuestionarios</h1>
    <div class="row">
      <div class="col-md-4" v-for="(escuela, i) in escuelas" :key="i">
        <div class="alert" :class="escuela.class" role="alert" @click="eligirEscuela(i)">
          {{escuela.escuela}}
        </div>
      </div>
    </div>
    <div class="row mt-5 d-flex justify-content-center" v-if="spinner">
      <div class="spinner-border" role="status">
        <span class="visually-hidden text-center">Loading...</span>
      </div>
    </div>
    <div class="row mt-5">
      <WELCOME v-if="escuela == 0"/>
      <UPIITA v-else-if="escuela == 1" :cuestionarios="cuestionarios"/>
      <!-- <ESCOM v-else-if="escuela == 1" :cuestionarios="cuestionarios"/> -->
      <NoCuestionario v-else/>
    </div>
  </div>
</template>

<script>
import UPIITA from '@/components/UPIITA.vue'
import WELCOME from '@/components/WELCOME.vue'
// import ESCOM from '@/components/ESCOM.vue'
import NoCuestionario from '@/components/NoCuestionario.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'InfoCuestionarios',
  components: {
    UPIITA,
    // ESCOM,
    WELCOME,
    NoCuestionario
  },
  data() {
    return {
      escuela: '0',
      escuelas: [
        {escuela: 'UPIITA', class: 'alert-primary'},
        {escuela: 'ESCOM', class: 'alert-success'},
        {escuela: 'UACM', class: 'alert-danger'},
        {escuela: 'UNAH', class: 'alert-warning'},
        {escuela: 'CICATA', class: 'alert-info'}
      ],
      cuestionarios: [],
      spinner: false
    }
  },
  computed: {
    ...mapGetters(['usuarioAutenticado'])
  },
  methods: {
    ...mapActions(['cerrarSesion']),

    //Función que coloca el indice de la escuela que se quiere mostrar
    eligirEscuela(escuela) {

      /*Asiganmos el indice a la variable escuela -> 
      Esta será evaluada para mostrar los cursos correspondintes 
      a dicha escuela */
      this.escuela = escuela + 1;

    },
    showAlert() {
      this.$swal({
        position: 'top-end',
        icon: 'success',
        title: 'Hola, bienvenido al sistema',
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async created() {

    //Mostramos la alerta
    this.showAlert();

    //Inicializamos el spinner
    this.spinner = true;

    //Consultar la información de todos los cursos
    const API = 'http://localhost:3000/cuestionarios';

    try {
      const response = await fetch(API);
      const data = await response.json();
      this.cuestionarios = data.cuestionarios;
    } catch (error) {
      console.log(error);
    }

    //Quitamos el spinner
    this.spinner = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alert:hover {
    cursor: pointer;
  }
</style>
