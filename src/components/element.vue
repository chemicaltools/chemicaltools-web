<template>
  <v-container>
    <v-layout row wrap>
      <v-text-field :label="$t('message.elementhint')" v-model="input"></v-text-field>
      <v-btn color="success" v-on:click="outputelement(input)">{{$t("message.search")}}</v-btn>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <v-data-table
          :items="results"
          :no-data-text="$t(info)"
          disable-initial-sort
          hide-actions
          hide-headers
        >
          <template v-slot:items="result">
            <template
              v-if="result.item.exclude?result.item.exclude.indexOf($i18n.locale)==-1:true"
            >
              <td>{{ $t(result.item.name) }}</td>
              <td class="text-xs-right">{{ result.item.value }}</td>
            </template>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-btn cl :href="wikipedia" v-show="wikipedia" target="_blank">{{$t("message.wikipedia")}}</v-btn>
        </div>
      </v-flex>
      <v-flex xs2 v-show="url">
        <v-img :src="url" :lazy-src="url"></v-img>
      </v-flex>
    </v-layout>
    <div style="overflow-y:scroll;width:100%;overflow-x:none;" v-html="elementtable"></div>
  </v-container>
</template>
<script>
const chemicaltools = require("chemicaltools");
export default {
  data: () => ({
    results: [],
    input: "",
    info: "message.elementnodata",
    url: "",
    wikipedia: "",
    elementtable: ""
  }),
  methods: {
    outputelement: function(input) {
      var info = chemicaltools.searchElement(input);
      if (info) {
        this.results = [
          { name: "element.name", value: info.name, exclude: ["en"] },
          { name: "element.symbol", value: info.symbol },
          { name: "element.iupac", value: info.iupac },
          { name: "element.number", value: info.number },
          { name: "element.mass", value: info.mass },
          { name: "element.origin", value: info.origin }
        ];
        this.url = info.url;
        this.wikipedia = "https://en.wikipedia.org/wiki/" + info.iupac;
      } else {
        this.results = [];
        this.info = "message.wronginput";
        this.url = "";
        this.wikipeida = "";
      }
    },
    makeelementtable: function() {
      var n = 0;
      var output = "<table style='text-align:center;'>";
      for (var i = 0; i <= 9; i++) {
        output += "<tr>";
        for (var j = 0; j <= 18; j++) {
          if (
            (i == 1 && j >= 2 && j <= 17) ||
            ((i == 2 || i == 3) && j >= 3 && j <= 12) ||
            ((i == 8 || i == 9) && j > 15)
          ) {
            if (i == 1 && j == 2) {
              output += "<td colspan=16></td>";
            } else if ((i == 2 || i == 3) && j == 3) {
              output += "<td colspan=10></td>";
            }
          } else {
            output += "<td style='border:1px solid;border-collapse:collapse'>";
            if (i == 0 && j > 0) {
              output += j;
            } else if (i > 0 && j == 0) {
              if (i < 8) {
                output += i;
              } else if (i == 8) {
                output += "Lanthanide";
              } else if (i == 9) {
                output += "Actinide";
              }
            } else if (i > 0) {
              if (i == 6 && j == 4) {
                n = 71;
              } else if (i == 7 && j == 4) {
                n = 103;
              } else if (i == 8 && j == 1) {
                n = 56;
              } else if (i == 9 && j == 1) {
                n = 88;
              }
              output += "<sub>{0}</sub>{1}<br>{2}<br><small>{3}</small>".format(
                chemicaltools.elementinfo[n].number,
                chemicaltools.elementinfo[n].symbol,
                chemicaltools.elementinfo[n].iupac,
                chemicaltools.elementinfo[n].mass
              );
              n++;
            }
            output += "</td>";
          }
        }
        output += "</tr>";
      }
      output += "</table>";
      this.elementtable = output;
    }
  },
  mounted: function() {
    this.makeelementtable();
  }
};
</script>
