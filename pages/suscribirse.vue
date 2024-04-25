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
      <v-card-title style="text-align: center">Suscríbete</v-card-title>
      <v-card-subtitle style="text-align: center">
        Suscríbete para recibir contendio y actualizaciones
      </v-card-subtitle>
      <br />

      <div class="Nombre">
        <div class="text-subtitle-1 text-medium-emphasis">Nombre</div>
        <v-text-field
          v-model="nombre"
          density="compact"
          placeholder="Ingresa tu nombre"
          prepend-inner-icon="mdi-account"
          variant="underlined"
          :rules="rules"
        ></v-text-field>
      </div>

      <div class="correo">
        <div class="text-subtitle-1 text-medium-emphasis">
          Correo electrónico
        </div>
        <v-text-field
          type="email"
          density="compact"
          placeholder="Ingresa tu correo"
          prepend-inner-icon="mdi-email"
          variant="underlined"
          :rules="emailRules"
        ></v-text-field>
      </div>
      <br>
      <v-container>
        <v-row justify="center">
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
              @click="Registrar"
            >
              Suscribir
            </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
import { alertService } from "../services/alertService";

const rules = [(v) => !!v || "El campo es obligatorio"];
const emailRules = [
  (v) => !!v || "El correo electrónico es requerido",
  (v) => /.+@.+\..+/.test(v) || "El correo electrónico debe ser válido",
];
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
