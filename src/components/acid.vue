<template>
  <v-container>
    <v-layout row wrap>
      <v-text-field :label="$t('message.pkab')" v-model="pKa"></v-text-field>
      <v-select :items="ablabel" :label="$t('message.ab')" v-model="AorB"></v-select>
    </v-layout>
    <v-layout row wrap>
      <v-text-field :label="$t('message.c')" v-model="c"></v-text-field>
      <v-btn color="success" v-on:click="calacid(c,pKa,AorB)">{{$t("message.calculate")}}</v-btn>
    </v-layout>
    <div class="pt-3" v-html="output"></div>
  </v-container>
</template>
<script>
const chemicaltools = require("chemicaltools");
const format = require("string-format");
import { chemicalname, scicount } from "../chem.js";
format.extend(String.prototype, {});

export default {
  data: () => ({
    output: "Please input data.",
    results: [],
    pKa: "",
    c: "",
    ablabel: ["Acid", "Base"],
    AorB: "Acid"
  }),
  methods: {
    calacid: function(c, strpKa, AorB, pKw = 14) {
      if (!strpKa || !c) this.output = "Please input data!";
      var strpKaArray = strpKa.split(/[\r\n\\s ,;]+/);
      var result = chemicaltools.calculateAcid(
        c,
        strpKaArray.map(parseFloat),
        AorB == "Acid",
        pKw
      );
      var output = "<b>{0}</b>, c={1}mol/L, ".format(
        AorB == "Acid" ? "HA" : "BOH",
        c
      );
      var i = 1;
      strpKaArray.forEach(function(pKa) {
        output += "pK<sub>{0}</sub>{1}={2}, ".format(
          AorB == "Acid" ? "a" : "b",
          strpKaArray.length > 1 ? "<sub>{0}</sub>".format(i++) : "",
          pKa
        );
      });
      output += "<br>{0}{1}.".format("pH is ", result.pH.toFixed(2));
      result.ion.forEach(function(ion) {
        output += "<br>c({0})={1}mol/L,".format(
          chemicalname(ion.name),
          scicount(ion.c, 2)
        );
      });
      output = output.substring(0, output.length - 1) + ".";
      this.output = output;
    }
  }
};
</script>
