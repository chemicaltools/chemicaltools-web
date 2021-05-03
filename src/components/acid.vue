<template>
  <v-container>
    <v-row wrap>
      <v-text-field :label="AorB?'pKa':'pKb'" v-model="pKa"></v-text-field>
      <v-select :items="$t('ablabel')" :label="$t('message.ab')" v-model="AorB"></v-select>
    </v-row>
    <v-row wrap>
      <v-text-field :label="$t('message.c')" v-model="c"></v-text-field>
      <v-btn color="success" v-on:click="calacid(c,pKa,AorB)">{{$t("message.calculate")}}</v-btn>
    </v-row>
    <div class="pt-3" v-show="!output">{{$t("message.inputdata")}}</div>
    <div class="pt-3" v-html="output"></div>
  </v-container>
</template>
<script>
import { chemicalname, scicount } from '../chem.js'
const chemicaltools = require('chemicaltools')

export default {
  data: () => ({
    output: '',
    results: [],
    pKa: '',
    c: '',
    AorB: true
  }),
  methods: {
    calacid: function (c, strpKa, AorB, pKw = 14) {
      if (!strpKa || !c) {
        this.output = ''
        return
      }
      const strpKaArray = strpKa.split(/[\r\n\\s ,;]+/)
      const result = chemicaltools.calculateAcid(
        c,
        strpKaArray.map(parseFloat),
        AorB,
        pKw
      )
      let output = `<b>${AorB ? 'HA' : 'BOH'}</b>, c=${c}mol/L, `
      let i = 1
      strpKaArray.forEach(function (pKa) {
        const n = strpKaArray.length > 1 ? `<sub>${i++}</sub>` : ''
        output += `pK<sub>${AorB ? 'a' : 'b'}</sub>${n}=${pKa}, `
      })
      output += `<br>pH=${result.pH.toFixed(2)}.`
      result.ion.forEach(function (ion) {
        output += `<br>c(${chemicalname(ion.name)})=${scicount(ion.c, 2)}mol/L,`
      })
      output = output.substring(0, output.length - 1) + '.'
      this.output = output
    }
  }
}
</script>
