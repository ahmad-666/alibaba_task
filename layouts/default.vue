<template>
  <v-app
    :style="{
      backgroundColor,
    }"
  >
    <v-app-bar app color="primary" class="shadow-1 countries-app-bar">
      <div class="main-section d-flex justify-space-between align-center">
        <nuxt-link to="/">
          <h1 class="text-subtitle-1 text-md-h4 font-weight-bold accent--text">
            Where in the world ?
          </h1>
        </nuxt-link>
        <v-btn
          text
          small
          class="text-caption text-md-button font-weight-bold"
          @click="toggleTheme"
        >
          <v-icon size="20"> mdi-moon-waning-crescent </v-icon>
          Dark mode
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt class="mt-15" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Default',
  computed: {
    theme() {
      const vuetifyIsDark = this.$vuetify.theme.dark;
      return vuetifyIsDark ? 'dark' : 'light';
    },
    backgroundColor() {
      return this.$vuetify.theme.themes[this.theme].secondary;
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = this.theme !== 'dark';
    },
  },
};
</script>
<style lang="scss">
.countries-app-bar {
  .v-toolbar__content {
    padding: 0px;
  }
}
</style>
