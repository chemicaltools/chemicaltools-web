<template>
  <v-container>
    <v-row wrap>
      <v-text-field :label="$t('message.formula')" v-model="input"></v-text-field>
      <v-btn color="success" v-on:click="outputmass(input)">{{$t("message.calculate")}}</v-btn>
    </v-row>
    <v-row wrap>
      <v-flex>
        <div class="pt-3" v-show="!results.length">{{ $t(output) }}</div>
        <div class="pt-3" v-html="name" v-show="results.length"></div>
        <div class="pt-3" v-show="results.length">
          <strong>{{ $t("message.massvalue") }}</strong>
          ={{mass}}
        </div>
        <v-data-table
          :header="$t('massheader')"
          :item="results"
          v-show="results.length"
          sort-by
          hide-default-footer
        >
          <template v-slot:item="result">
          <tr>
            <td v-show="$i18n.locale=='zh'">{{ result.item.name }}</td>
            <td>{{ result.item.iupac }}</td>
            <td class="text-xs-right">{{ result.item.symbol }}</td>
            <td class="text-xs-right">{{ result.item.atomnumber }}</td>
            <td class="text-xs-right">{{ result.item.mass | keepTwoNum }}</td>
            <td class="text-xs-right">{{ result.item.massper | keepTwoNum }}</td>
          </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-row>
  </v-container>
</template>
<script>
import { chemicalname } from '../chem.js'
const chemicaltools = require('chemicaltools')
const format = require('string-format')
format.extend(String.prototype, {})

export default {
  data: () => ({
    output: 'message.inputformula',
    results: [],
    input: '',
    name: '',
    mass: 0
  }),
  methods: {
    outputmass: function (input) {
      var result = chemicaltools.calculateMass(input)
      if (result) {
        this.name = chemicalname(result.name)
        this.mass = result.mass.toFixed(2)
        this.results = result.peratom
      } else {
        this.output = 'message.wronginput'
        this.results = []
      }
    }
  }
}
</script>
