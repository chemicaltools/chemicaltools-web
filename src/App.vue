<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-item v-for="(tool, i) in tools" :key="i" :to="tool.to">
          <v-list-item-action>
            <v-icon>{{tool.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t(tool.text)}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="purple" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline" v-show="!$vuetify.breakpoint.xs">
        {{ $t("message.chemicaltools") }}
        <img
          :src="`${publicPath}/chemicaltools_white.svg`"
          contain
          height="25"
        >
      </v-toolbar-title>
      <v-menu attach bottom offset-y>
        <template #activator="{ on: menu }">
          <v-btn :aria-label="$t('message.languages')" text style="min-width: 48px" v-on="menu">
            <v-icon>language</v-icon>
          </v-btn>
        </template>
        <v-list dense light>
          <v-list-item
            v-for="language in languages"
            :key="language.value"
            avatar
            @click="updatelang(language.value)"
          >
            <v-list-item-title v-text="language.text"/>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>

      <v-footer height="auto" color="purple lighten-1">
        <v-layout justify-center row wrap>
          <v-btn
            v-for="(link,i) in links"
            :key="i"
            color="white"
            text
            rounded
            :href="link.href"
            target="_blank"
          >{{ link.text }}</v-btn>
          <v-flex
            purple
            lighten-2
            py-3
            text-center
            xs12
          >Copyright &copy; 2016-2019 Jinzhe Zeng, Licensed under
            <v-btn
              rounded
              text
              href="https://www.apache.org/licenses/LICENSE-2.0"
              target="_blank"
            >the Apache License, Version 2.0</v-btn>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Chemical-Tools',
  data: () => ({
    publicPath: process.env.BASE_URL,
    drawer: null,
    tools: [
      {
        text: 'message.homepage',
        to: '/',
        icon: 'fa-home'
      },
      {
        text: 'message.element',
        to: '/element/',
        icon: 'fa-atom'
      },
      {
        text: 'message.mass',
        to: '/mass/',
        icon: 'fa-balance-scale'
      },
      {
        text: 'message.acid',
        to: '/acid/',
        icon: 'fa-flask'
      },
      {
        text: 'message.deviation',
        to: '/deviation/',
        icon: 'fa-chart-bar'
      },
      {
        text: 'message.gas',
        to: '/gas/',
        icon: 'fa-burn'
      },
      {
        text: 'message.exam',
        to: '/exam/',
        icon: 'fa-question'
      },
      {
        text: 'message.settings',
        to: '/setting/',
        icon: 'fa-cog'
      }
    ],
    links: [
      { text: "Jinzhe Zeng's Blog", href: 'https://njzjz.win/' },
      { text: 'Download', href: 'https://chem.njzjz.win/' },
      { text: 'GitHub', href: 'https://github.com/njzjz/Chemical-Tools-web' }
    ],
    languages: [
      { value: 'en', text: 'English' },
      { value: 'zh', text: '中文' }
    ]
  }),
  computed: {
    username () {
      return this.$route.params.username
    },
    title () {
      const title = this.$t(this.$route.meta.title)
      const appname = this.$t('message.chemicaltools')
      window.document.title = title + ' - ' + appname
      return title
    }
  },
  mounted: function () {
    this.$i18n.locale = this.$storage.get('lang', navigator.language.split('-')[0] || 'en')
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    updatelang (value) {
      this.$i18n.locale = value
      this.$storage.set('lang', value)
    }
  }
}
</script>
