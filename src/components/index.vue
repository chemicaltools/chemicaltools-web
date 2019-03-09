<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/logo.png')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-3 font-weight-bold mb-3">{{$t('message.chemicaltools')}}</h1>
        <p class="subheading font-weight-regular">{{$t('message.description')}}</p>
      </v-flex>

      <v-flex mb-5 xs12>
        <v-layout row wrap class="justify-center">
          <v-flex v-for="(tool, i) in tools" :key="i" xs4 class="mx-5">
            <v-btn :to="tool.to" block dark color="purple">
              <v-icon class="mx-1">{{ tool.icon }}</v-icon>
              {{ $t(tool.text) }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tools: [
      {
        text: "message.element",
        to: "/element/",
        icon: "fa-atom"
      },
      {
        text: "message.mass",
        to: "/mass/",
        icon: "fa-balance-scale"
      },
      {
        text: "message.acid",
        to: "/acid/",
        icon: "fa-flask"
      },
      {
        text: "message.deviation",
        to: "/deviation/",
        icon: "fa-chart-bar"
      },
      {
        text: "message.gas",
        to: "/gas/",
        icon: "fa-burn"
      },
      {
        text: "message.exam",
        to: "/exam/",
        icon: "fa-question"
      }
    ]
  })
};
</script>

<style>
</style>
