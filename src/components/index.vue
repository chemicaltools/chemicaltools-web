<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/logo.png')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-3 font-weight-bold mb-3">{{$t('message.chemicaltools')}}</h1>
        <p class="subheading font-weight-regular">{{$t('message.description')}}</p>
      </v-flex>

      <v-flex mb-3>
        <v-row wrap class="justify-center">
          <v-flex v-for="(tool, i) in tools" :key="i" class="mx-3" style="width:200px;">
            <v-btn :to="tool.to" block dark color="purple lighten-1" class="ma-2">
              <v-icon>{{tool.icon}}</v-icon>
              {{ $t(tool.text) }}
            </v-btn>
          </v-flex>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tools: [
      {
        text: 'message.element',
        to: '/element/',
        icon: 'fa-atom'
      },
      {
        text: 'message.mass',
        to: '/mass/',
        icon: 'fa-balance-scale'
      },
      {
        text: 'message.acid',
        to: '/acid/',
        icon: 'fa-flask'
      },
      {
        text: 'message.deviation',
        to: '/deviation/',
        icon: 'fa-chart-bar'
      },
      {
        text: 'message.gas',
        to: '/gas/',
        icon: 'fa-burn'
      },
      {
        text: 'message.exam',
        to: '/exam/',
        icon: 'fa-question'
      }
    ]
  })
}
</script>
