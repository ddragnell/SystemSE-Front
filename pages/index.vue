<template>
  <v-container>
    <v-banner
      lines="one"
      icon="mdi-calculator"
      color="#765D39"
      class="my-2"
    >
      <v-banner-text> Esta calculadora de intervalos de confianza calcula el intervalo de confianza 
        para un grupo de datos muestreado. </v-banner-text>
    </v-banner>

    <v-banner
      lines="three"
      icon="mdi-sigma"
      color="#765D39"
      class="my-2"
    >
      <v-banner-text style="text-align: justify;">
        En el apartado de media encuentras el formato para calcular el intervalo de confianza
        para el parámetro de media poblacional, esto ingresando los campos de media muestral,
        desviación estándar (muestral o poblacional según el caso), tamaño de muestra y 
        porcentaje de confianza (90%, 95%, 99%), además, para realizar  este cálculo es 
        necesario escoger el tipo de caso de uso, los casos son:
        <v-banner-text>
            1.Población normal y varianza conocida
        </v-banner-text>
        <v-banner-text>
            2.Población normal, varianza desconocida y tamaño de muestra menor que 30  (pequeño)
        </v-banner-text>
        <v-banner-text>
            3.Población cualquiera, varianza desconocida y tamaño de muestra mayor o igual a 30 (grande)
        </v-banner-text>
        <v-banner-text>
            4.Población cualquiera, varianza conocida y tamaño de muestra mayor o igual a 30 (grande)
        </v-banner-text>
      </v-banner-text>
    </v-banner>

    <v-banner lines="three" icon="mdi-percent" color="#765D39" class="my-2">
      <v-banner-text style="text-align: justify;">
        En el apartado de proporción encuentras el formato para calcular el intervalo de confianza
        para la proporción de una población normal, esto ingresando los campos de proporción,
        tamaño de muestra y porcentaje de confianza (90%, 95%, 99%).
      </v-banner-text>
    </v-banner>
    <v-banner lines="three" icon="mdi-chart-scatter-plot" color="#765D39" class="my-2">
      <v-banner-text style="text-align: justify;">
        En el apartado de varianza encuentras el formato para calcular el intervalo de confianza
        para la varianza (parámetro poblacional) de una población normal, esto ingresando los 
        campos de desviación estándar, tamaño de muestra y porcentaje de confianza (90%, 95%, 99%).
      </v-banner-text>
    </v-banner>
  </v-container>
</template>
