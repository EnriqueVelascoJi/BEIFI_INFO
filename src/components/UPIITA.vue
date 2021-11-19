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
                <a class="btn btn-info" @click="consultarInformacion(i, cuestionario)">Ver información</a>
            </div>
        </div>
    </div>
    
    <div class="container">
        <Cuestionario2 v-if="cuestionario == 0" :datos="datosCuestionario"/>
    </div>
</template>

<script>
import Cuestionario2 from '@/components/Cuestionario2.vue'

export default {
    components: {
        Cuestionario2
    },
    props: {
        cuestionarios: Array
    },
    data() {
        return {
            cuestionariosFiltrados: [],
            cuestionario: -1,
            datosCuestionario: {}
        }
    },
    methods: {
        //Función que coloca el indice del curso que se quiere consultar su información
        consultarInformacion(i, cuestionario){
            this.cuestionario = i;
            this.datosCuestionario = {
                curso: cuestionario.curso,
                profesor: cuestionario.profesor,
                escuela: cuestionario.escuela,
                instituto: cuestionario.instituto
            };
        }
    },
    async created() {

        
        this.cuestionariosFiltrados = this.cuestionarios.filter(cuestionario => cuestionario.escuela === 'UPIITA');
       
    }
}
</script>

<style>

</style>