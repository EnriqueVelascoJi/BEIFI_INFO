<template>
   <div class="col-md-4 mb-5 d-flex justify-content-center" v-for="(cuestionario, i) in cuestionariosFiltrados" :key="i" >
        <div class="card" style="width: 18rem;">
        <img src="https://previews.123rf.com/images/fbatista72/fbatista720911/fbatista72091100101/5909490-ecuaci%C3%B3n-de-matem%C3%A1ticas-avanzadas-f%C3%B3rmula-.jpg" class="card-img-top" alt="cuestionario.nombre">
        <div class="card-body">
            <h5 class="card-title">{{cuestionario.curso}}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Profesor: {{cuestionario.profesor}}</li>
            <li class="list-group-item">Escuela: {{cuestionario.escuela}}</li>
            <li class="list-group-item">Instituto: {{cuestionario.instituto}}</li>
            <li class="list-group-item">País: {{cuestionario.pais}}</li>
        </ul>
        <div class="card-body">
            <router-link :to="cuestionario.nombre_cuestionario">
                <a href="#" class="card-link">Ver información</a>
            </router-link>
        </div>
        </div>
    </div>
</template>

<script>
export default {
     props: {
        cuestionarios: Array
    },
    data() {
        return {
            cuestionariosFiltrados: []
        }
    },
    methods: {
    
    },
    async created() {

       this.cuestionariosFiltrados = this.cuestionarios.filter(cuestionario => cuestionario.escuela === 'ESCOM');
    }
}
</script>

<style>

</style>