<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile v-for="(tool, i) in tools" :key="i" :to="tool.to">
          <v-list-tile-action>
            <v-icon>{{tool.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t(tool.text)}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="purple" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span>{{ $t($route.meta.title) }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline">
        <v-select v-model="$i18n.locale" :items="langs" :label="$t('message.languages')"></v-select>
      </v-toolbar-title>
      <v-toolbar-title class="headline">
        {{ $t("message.chemicaltools") }}
        <img :src="require('./assets/logo.png')" contain height="25">
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer height="auto" color="purple lighten-1">
      <v-layout justify-center row wrap>
        <v-btn
          v-for="(link,i) in links"
          :key="i"
          color="white"
          flat
          round
          :href="link.href"
        >{{ link.text }}</v-btn>
        <v-flex purple lighten-2 py-3 text-xs-center white--text xs12>
          <a href="https://www.apache.org/licenses/LICENSE-2.0">
            <v-icon>fa-copyright</v-icon>
          </a> Copyright &copy; 2016-2019 Jinzhe Zeng, Licensed under the Apache License, Version 2.0.
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Chemical-Tools",
  data: () => ({
    drawer: null,
    tools: [
      {
        text: "message.homepage",
        to: "/",
        icon: "home"
      },
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
      },
      {
        text: "message.settings",
        to: "/setting/",
        icon: "fa-cog"
      }
    ],
    links: [
      { text: "Jinzhe Zeng's Blog", src: "https://njzjz.win/" },
      { text: "Download", href: "https://chem.njzjz.win/" },
      { text: "GitHub", href: "https://github.com/njzjz/Chemical-Tools-web" }
    ],
    langs: [{ value: "en", text: "English" }, { value: "zh", text: "中文" }]
  }),
  computed: {
    username() {
      return this.$route.params.username;
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>
