<template>
  <v-container>
    <v-radio-group v-model="mode">
      <v-layout row wrap :key="i" v-for="(value, i) in values">
        <v-radio :label="value.text" :value="value.text"></v-radio>
        <v-text-field :label="$t(value.label)" v-model="value.input"></v-text-field>
      </v-layout>
    </v-radio-group>
    <v-btn color="success" v-on:click="outputgas">{{$t("message.calculate")}}</v-btn>
  </v-container>
</template>
<script>
const chemicaltools = require('chemicaltools')
export default {
  data: () => ({
    mode: 'p',
    values: [
      { text: 'p', label: 'gas.p', input: '' },
      { text: 'V', label: 'gas.V', input: '' },
      { text: 'n', label: 'gas.n', input: '' },
      { text: 'T', label: 'gas.T', input: '' }
    ]
  }),
  methods: {
    outputgas: function () {
      var mode = this.mode
      var gasoutput = chemicaltools.calculateGas(
        ...this.values.map(function (value) {
          if (value.text === mode) return null
          return value.input
        })
      )
      this.values.forEach(function (value) {
        value.input = gasoutput[value.text]
      })
    }
  }
}
</script>
