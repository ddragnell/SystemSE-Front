<template>
  <v-layout>
    <v-app-bar style="background-color: #765D39; 
    color:azure; text-decoration: dotted; font-size: 30px;" img>
    <v-img src="~/public/images/LogoE.png"></v-img>
    </v-app-bar>
    <v-navigation-drawer expand-on-hover rail>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home"
          title="Inicio"
          value="inicio"
          to="/"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-alpha-m-box-outline"
          title="Media"
          value="media"
          to="/media"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-percent"
          title="Proporción"
          value="proporcion"
          to="/proporcion"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-sigma-lower"
          title="Varianza"
          value="varianza"
          to="/varianza"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 250px">
      <slot />
    </v-main>
  </v-layout>
</template>

<script setup>
const titleApp = ref("SystemSE")
</script>