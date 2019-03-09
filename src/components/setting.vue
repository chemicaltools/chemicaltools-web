<template>
  <v-card>
    <v-list subheader two-line>
      <v-subheader>{{$t("message.exam")}}</v-subheader>

      <v-list-tile>
        <v-list-tile-content block>
          <v-select
            :items="testmodes"
            v-model="mode"
            label="Test mode"
            @change="updatevalue('mode',mode)"
          ></v-select>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content block>
          <v-select
            :items="testnumbers"
            v-model="number"
            label="Limit of atomic number"
            @change="updatevalue('number',number)"
          ></v-select>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>

    <v-list subheader two-line>
      <v-subheader>{{$t("message.acid")}}</v-subheader>
      <v-list-tile>
        <v-list-tile-content block>
          <v-text-field label="pKw" v-model="pkw" @change="updatevalue('pkw',pkw)"></v-text-field>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    testmodes: [
      {
        value: 0,
        text: "Answer symbols for elements according to Chinese names"
      },
      { value: 1, text: "Answer atomic numbers according to Chinese names" },
      { value: 2, text: "Answer IUPAC names according to Chinese names" },
      {
        value: 3,
        text: "Answer Chinese names according to symbols for elements"
      },
      {
        value: 4,
        text: "Answer atomic numbers according to symbols for elements"
      },
      {
        value: 5,
        text: "Answer IUPAC names according to symbols for elements"
      },
      { value: 6, text: "Answer Chinese names according to atomic numbers" },
      {
        value: 7,
        text: "Answer symbols for elements according to atomic numbers"
      },
      { value: 8, text: "Answer IUPAC names according to atomic numbers" },
      { value: 9, text: "Answer Chinese names according to IUPAC names" },
      {
        value: 10,
        text: "Answer symbols for elements according to IUPAC names"
      },
      { value: 11, text: "Answer atomic numbers according to IUPAC names" }
    ],
    testnumbers: [18, 36, 54, 86, 118],
    mode: 2,
    number: 86,
    pkw: 14,
  }),
  mounted: function() {
    var that = this;
    ["mode", "number", "pkw"].forEach(function(setting) {
      that[setting] = that.$storage.get(setting, that[setting]);
    });
  },
  methods: {
    updatevalue: function(name, value) {
      this.$storage.set(name, value);
    }
  }
};
</script>
