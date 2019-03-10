<template>
  <v-card>
    <v-list subheader two-line>
      <v-subheader>{{$t("message.exam")}}</v-subheader>

      <v-list-tile>
        <v-list-tile-content block>
          <v-select
            :items="$t('testmodes')"
            v-model="mode"
            :label="$t('message.testmode')"
            @change="updatevalue('mode',mode)"
          ></v-select>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content block>
          <v-select
            :items="testnumbers"
            v-model="number"
            :label="$t('message.numberlimit')"
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
