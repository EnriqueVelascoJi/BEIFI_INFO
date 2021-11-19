<template>
  <div class="container mb-5">
        <div class="row d-flex justify-content-center" v-if="spinner">
            <div class="spinner-border" role="status">
                <span class="visually-hidden text-center">Loading...</span>
            </div>
        </div>
        <div class="cuestionario-resultados">
            <table class="table" id="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Versión</th>
                <th scope="col">1. ¿Consideras que los campos eléctricos son reales, en el mismo sentido que los objetos físicos?</th>
                <th scope="col">2. ¿Un campo eléctrico, está en el tiempo?</th>
                <th scope="col">3. ¿Un campo eléctrico, encarna algo en la realidad material?</th>
                <th scope="col">4. Los campos eléctricos, ¿son objetos físicos?</th>
                <th scope="col">5. ¿Consideras que la representación matemática de un objeto físico define la naturaleza de este último? </th>
                <th scope="col">6. ¿Crees que, para conceptualizar una entidad física, sólo puede hacerse mediante una representación matemática?</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(respuesta, i) in respuestas" :key="i">
                    <th scope="row">{{i+1}}</th>
                    <th>{{respuesta.nombre}}</th>
                    <td>{{respuesta.version}}</td>
                    <td>{{respuesta.respuestas.pregunta1}}</td>
                    <td>{{respuesta.respuestas.pregunta2}}</td>
                    <td>{{respuesta.respuestas.pregunta3}}</td>
                    <td>{{respuesta.respuestas.pregunta4}}</td>
                    <td>{{respuesta.respuestas.pregunta5}}</td>
                    <td>{{respuesta.respuestas.pregunta6}}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="descargar mb-5 mt-5">
            <button class="btn btn-danger" @click="generarPDF">Descargar Información</button>
        </div>
  </div>
</template>

<script>

import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
    props: {
        datos: Object
    },
    data() {
        return {
            respuestas: [],
            spinner: false
        }
    },
    methods: {
        //Función que genera el pdf de los datos y los descarga
        generarPDF() {

            // console.log(this.datos);
            const {curso, profesor, escuela, instituto} = this.datos;
            console.log(curso, profesor, escuela, instituto);

            const doc = new jsPDF();

            //Ebcabezados
            doc.setFontSize(30);
            doc.text(15, 30, `${instituto} - ${escuela}`);

            doc.setFontSize(20);
            doc.text(15, 40, `Curso: ${curso}`);

            doc.setFont("courier");
            doc.setFontSize(14);
            doc.text(15, 50, `Profesor: ${profesor}`);

            //Tabla
            doc.autoTable({
                startY: 60,
                html: '#table' 
            })
            doc.save(`${curso}_${profesor}.pdf`);
        }
    },
    async created() {

        //Iniciamos el sppiner 
        this.spinner = true;

        //Consultar la información de todos los curso
        const API = 'http://localhost:3000/cuestionarios/cuestionario2';

        try {
            const response = await fetch(API);
            const data = await response.json();
            this.respuestas = data.respuestas;

            // console.log(this.respuestas);
        } catch (error) {
            console.log(error);
        }
        
        //Finalizamos el spinner
        this.spinner = false;
        
        
    },
    
}
</script>

<style>

</style>