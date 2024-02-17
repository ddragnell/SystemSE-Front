<template>
  <Loader v-if="loading"></Loader>

  <v-container class="container-p">
    <br />
    <v-card class="mx-auto pa-4 pb-2" elevation="20" max-width="448" rounded="lg">
      <v-card-title style="text-align: center">Intervalo de confianza para la media</v-card-title>

      <div class="condicion">
        <div class="text-subtitle-1 text-medium-emphasis">Condición</div>
        <v-select v-model="condicion" density="compact" placeholder="Condición"
          prepend-inner-icon="mdi-alpha-m-box-outline" :items="condiciones" variant="underlined"></v-select>
      </div>

      <div class="confianza">
        <div class="text-subtitle-1 text-medium-emphasis">Confianza</div>
        <v-select v-model="confianza" density="compact" placeholder="Porcentaje de confianza"
          prepend-inner-icon="mdi-percent" :items="confianzas" variant="underlined"></v-select>
      </div>

      <div class="media">
        <div class="text-subtitle-1 text-medium-emphasis">
          Media muestral
        </div>
        <v-text-field type="number" min="0" v-model="media" density="compact" placeholder="Valor de la media muestral"
          prepend-inner-icon="mdi-sigma" variant="underlined" :rules="[rules, numeroRules].flat()"></v-text-field>
      </div>

      <v-expand-transition>
        <div class="desviacion-muestral" v-show="!varianzaConocida">
          <div class="text-subtitle-1 text-medium-emphasis">
            Desviación muestral
          </div>
          <v-text-field type="number" min="0" v-model="desviacionMuestral" density="compact"
            placeholder="Valor de la desviación muestral" prepend-inner-icon="mdi-chart-scatter-plot" variant="underlined"
            :rules="[rules, numeroRules].flat()"></v-text-field>
        </div>
      </v-expand-transition>

      <v-expand-transition>
        <div class="desviacion-poblacional" v-show="varianzaConocida">
          <div class="text-subtitle-1 text-medium-emphasis">
            Desviación poblacional
          </div>
          <v-text-field type="number" min="0" v-model="desviacionPoblacional" density="compact"
            placeholder="Valor de la desviación poblacional" prepend-inner-icon="mdi-chart-scatter-plot"
            variant="underlined" :rules="[rules, numeroRules].flat()"></v-text-field>
        </div>
      </v-expand-transition>

      <div class="text-subtitle-1 text-medium-emphasis">
        Tamaño de la muestra
      </div>
      <v-text-field type="number" min="0" step="1" v-model="muestra" density="compact" placeholder="Tamaño de la muestra"
        prepend-inner-icon="mdi-abacus" variant="underlined" :rules="[rules, numeroRules].flat()"></v-text-field>

      <v-btn block class="mb-2" style="color: azure; variant: outline; background-color: #765d39" color="#765D39"
        size="large" @click="calcular">
        Calcular
      </v-btn>

      <v-btn block class="mb-6" style="color: azure; variant: outline; background-color: #5D6D7E" color="#5D6D7E"
        size="large" @click="limpiar">
        Limpiar
      </v-btn>
    </v-card>
  </v-container>
</template>


<script setup>
import { mediaService } from '../services/mediaService';
import { utilsService } from '../services/utilsService';
import { alertService } from '../services/alertService';

const rules = [(v) => !!v || "El campo es obligatorio"];
const numeroRules = [(v) => utilsService.isNumber(v) || "Solo se permiten números"];

const loading = ref(false);
const condicion = ref(null);
const condiciones = [
  { title: "Seleccionar...", value: null },
  { title: "Población normal y varianza conocida", value: 1 },
  { title: "Población normal, varianza desconocida y n<30", value: 2 },
  { title: "Población cualquiera, varianza desconocida y n≥30", value: 3 },
  { title: "Población cualquiera, varianza conocida y n≥30", value: 4 },
];
const confianza = ref(null);
const confianzas = [
  { title: "Seleccionar...", value: null },
  { title: "90%", value: 0.90 },
  { title: "95%", value: 0.95 },
  { title: "99%", value: 0.99 },
];
const media = ref("");
const varianzaConocida = computed(() => {
  return condicion.value == 1 || condicion.value == 4;
});
const desviacionMuestral = ref(null);
const desviacionPoblacional = ref(null);
const muestra = ref(null);

const camposCompletos = computed(() => {
  return (
    condicion.value &&
    confianza.value &&
    media.value &&
    ((!varianzaConocida.value && desviacionMuestral.value) || (varianzaConocida.value && desviacionPoblacional.value)) &&
    muestra.value
  );
});

const calcular = async () => {
  loading.value = true;
  if (camposCompletos.value) {
    if (!utilsService.isNumber(media.value) || !utilsService.greaterThanOrEqualTo0(media.value)) {
      alertService.warning(
        "Advertencia",
        "La media muestral debe ser un número mayor o igual a 0."
      );
    } else if (varianzaConocida.value && (!utilsService.isNumber(desviacionPoblacional.value) || !utilsService.greaterThanOrEqualTo0(desviacionPoblacional.value))) {
      alertService.warning(
        "Advertencia",
        "La desviación poblacional debe ser un número mayor o igual a 0."
      );
    } else if (!varianzaConocida.value && (!utilsService.isNumber(desviacionMuestral.value) || !utilsService.greaterThanOrEqualTo0(desviacionMuestral.value))) {
      alertService.warning(
        "Advertencia",
        "La desviación muestral debe ser un número mayor o igual a 0."
      );
    } else if (!utilsService.isInteger(muestra.value) || !utilsService.greaterThan0(muestra.value)) {
      alertService.warning(
        "Advertencia",
        "El tamaño de la muestra debe ser un número entero mayor a 0."
      );
    } else {
      let interval = null;
      switch (condicion.value) {
        case 1:
          interval = await mediaService.poblacionNormalVarianzaConocida(
            parseFloat(media.value),
            parseFloat((1 - confianza.value).toFixed(2)),
            parseFloat(desviacionPoblacional.value),
            parseInt(muestra.value)
          );
          break;
        case 2:
          interval = await mediaService.poblacionNormalVarianzaDesconocida(
            parseFloat(media.value),
            parseFloat((1 - confianza.value).toFixed(2)),
            parseFloat(desviacionMuestral.value),
            parseInt(muestra.value)
          );
          break;
        case 3:
          interval = await mediaService.poblacionCualquieraVarianzaDesconocida(
            parseFloat(media.value),
            parseFloat((1 - confianza.value).toFixed(2)),
            parseFloat(desviacionMuestral.value),
            parseInt(muestra.value)
          );
          break;
        case 4:
          interval = await mediaService.poblacionCualquieraVarianzaConocida(
            parseFloat(media.value),
            parseFloat((1 - confianza.value).toFixed(2)),
            parseFloat(desviacionPoblacional.value),
            parseInt(muestra.value)
          );
          break;
      }

      if (interval) {
        alertService.informative(
          "Resultado",
          `Con una confianza del ${confianza.value * 100}%, se espera que la media poblacional esté entre: <br/><br/><b>${interval.L}</b> <br/><br/>y <br/><br/><b>${interval.U}</b>`
        );
      }
    }
  } else {
    alertService.warning(
      "Advertencia",
      "Por favor, ingrese todos los datos solicitados para realizar el cálculo del intervalo."
    );
  }
  loading.value = false;
}

const limpiar = () => {
  condicion.value = null;
  confianza.value = null;
  media.value = null;
  desviacionMuestral.value = null;
  desviacionPoblacional.value = null;
  muestra.value = null;
}
</script>


<style>
.titulo {
  font-family: sans-serif !important;
  font-weight: bold !important;
  text-align: center !important;
  font-size: 25px !important;
  margin-left: 10px !important;
  margin-top: 10px !important;
}
</style>
