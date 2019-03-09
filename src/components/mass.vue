<template>
  <v-container>
    <v-layout row wrap>
      <v-text-field :label="$t('message.formula')" v-model="input"></v-text-field>
      <v-btn color="success" v-on:click="outputmass(input)">{{$t("message.calculate")}}</v-btn>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <div class="pt-3" v-html="output"></div>
        <v-data-table
          :headers="headers"
          :items="results"
          v-show="results.length"
          disable-initial-sort
          hide-actions
        >
          <template v-slot:items="result">
            <td>{{ result.item.iupac }}</td>
            <td class="text-xs-right">{{ result.item.symbol }}</td>
            <td class="text-xs-right">{{ result.item.atomnumber }}</td>
            <td class="text-xs-right">{{ result.item.mass | keepTwoNum }}</td>
            <td class="text-xs-right">{{ result.item.massper | keepTwoNum }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
const chemicaltools = require("chemicaltools");
const format = require("string-format");
import {chemicalname} from '../chem.js'
format.extend(String.prototype, {});

export default {
  data: () => ({
    output: "Please input the chemical formula.",
    results: [],
    input: "",
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Symbol", align: "right", value: "symbol" },
      { text: "Atom Number", align: "right", value: "atomnumber" },
      { text: "Mass", align: "right", value: "mass" },
      { text: "mass fraction (%)", align: "right", value: "massper" }
    ]
  }),
  methods: {
    outputmass: function(input) {
      var result = chemicaltools.calculateMass(input);
      if (result) {
        this.output = "<b>{1}</b><br><b>{0}</b>={2}".format(
          "Mass",
          chemicalname(result.name),
          result.mass.toFixed(2)
        );
        this.results = result.peratom;
      } else {
        this.output = "Wrong input.";
        this.results = [];
      }
    }
  }
};
</script>
