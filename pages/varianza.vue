<template>
  <Loader v-if="loading"></Loader>

  <v-container class="container-p">
    <br />
    <v-card
      class="mx-auto pa-4 pb-2"
      elevation="20"
      max-width="448"
      rounded="lg"
    >
      <v-card-title style="text-align: center"
        >Intervalo de confianza para la varianza</v-card-title
      >

      <div class="confianza">
        <div class="text-subtitle-1 text-medium-emphasis">Confianza</div>
        <v-select
          v-model="confianza"
          density="compact"
          placeholder="Porcentaje de confianza"
          prepend-inner-icon="mdi-percent"
          :items="confianzas"
          variant="underlined"
        ></v-select>
      </div>

      <div class="media">
        <div class="text-subtitle-1 text-medium-emphasis">
          Varianza muestral
        </div>
        <v-text-field
          type="number"
          min="0"
          v-model="desviacion"
          density="compact"
          placeholder="Valor de la varianza muestral"
          prepend-inner-icon="mdi-chart-scatter-plot"
          variant="underlined"
          :rules="[rules, numeroRules].flat()"
        ></v-text-field>
      </div>

      <div class="text-subtitle-1 text-medium-emphasis">
        Tamaño de la muestra
      </div>
      <v-text-field
        type="number"
        min="0"
        step="1"
        v-model="muestra"
        density="compact"
        placeholder="Tamaño de la muestra"
        prepend-inner-icon="mdi-abacus"
        variant="underlined"
        :rules="[rules, numeroRules].flat()"
      ></v-text-field>
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              block
              class="mb-2"
              style="
                color: azure;
                visibility: outline;
                background-color: #006db2;
                min-width: 150px;
                max-width: 150px;
              "
              color="#765D39"
              size="large"
              @click="calcular"
            >
              Calcular
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              block
              style="
                color: azure;
                visibility: outline;
                background-color: #5d6d7e;
                min-width: 150px;
                max-width: 150px;
              "
              color="#5D6D7E"
              size="large"
              @click="limpiar"
            >
              Limpiar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
import { varianzaService } from "../services/varianzaService";
import { utilsService } from "../services/utilsService";
import { alertService } from "../services/alertService";

const rules = [(v) => !!v || "El campo es obligatorio"];
const numeroRules = [
  (v) => utilsService.isNumber(v) || "Solo se permiten números",
];

const loading = ref(false);
const confianza = ref(null);
const confianzas = [
  { title: "Seleccionar...", value: null },
  { title: "90%", value: 0.9 },
  { title: "95%", value: 0.95 },
  { title: "99%", value: 0.99 },
];
const desviacion = ref(null);
const muestra = ref(null);
const camposCompletos = computed(() => {
  return confianza.value && desviacion.value && muestra.value;
});

const calcular = async () => {
  loading.value = true;
  if (camposCompletos.value) {
    if (
      !utilsService.isNumber(desviacion.value) ||
      !utilsService.greaterThan0(desviacion.value)
    ) {
      alertService.warning(
        "Advertencia",
        "La varianza muestral debe ser un número mayor a 0."
      );
    } else if (
      !utilsService.isInteger(muestra.value) ||
      !utilsService.greaterThan0(muestra.value)
    ) {
      alertService.warning(
        "Advertencia",
        "El tamaño de la muestra debe ser un número entero mayor a 0."
      );
    } else {
      const interval = await varianzaService.poblacionNormal(
        parseFloat(desviacion.value),
        parseFloat((1 - confianza.value).toFixed(2)),
        parseInt(muestra.value)
      );

      if (interval) {
        alertService.informative(
          "Resultado",
          `Con una confianza del ${
            confianza.value * 100
          }%, se espera que la varianza poblacional esté entre: <br/><br/><b>${
            interval.L
          }</b> <br/><br/>y <br/><br/><b>${interval.U}</b>`
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
};

const limpiar = () => {
  confianza.value = null;
  desviacion.value = null;
  muestra.value = null;
};
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
