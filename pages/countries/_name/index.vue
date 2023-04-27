<template>
  <div>
    <div class="main-section">
      <v-btn
        class="shadow-2 accent--text"
        color="primary"
        width="100"
        @click="$router.go(-1)"
      >
        <v-icon size="20">mdi-chevron-left</v-icon>
        Back
      </v-btn>
      <div class="mt-15">
        <CircleLoader v-if="loading" />
        <CountryDetails
          v-else
          :flag-img-src="flagImgSrc"
          :img-alt="flagAlt"
          :name="name"
          :native-name="nativeName"
          :top-level-domains="topLevelDomains"
          :population="population"
          :currencies="currencies"
          :region="region"
          :langs="langs"
          :sub-region="subRegion"
          :capital="capital"
          :border-countries="borderCountries"
        />
      </div>
    </div>

    <v-snackbar v-model="showError" color="error" dark>
      {{ errorText }}
    </v-snackbar>
  </div>
</template>
<script>
import CountryDetails from '~/components/CountryDetails.vue';
import CircleLoader from '~/components/CircleLoader.vue';
export default {
  components: {
    CountryDetails,
    CircleLoader,
  },
  data() {
    return {
      loading: false,
      showError: false,
      errorText: null,
      flagImgSrc: '',
      flagAlt: '',
      name: '',
      nativeName: '',
      topLevelDomains: [],
      population: 0,
      currencies: [],
      region: '',
      langs: [],
      subRegion: '',
      capital: '',
      borderCountries: [],
    };
  },
  async created() {
    // Use created because api needed VPN ... else we could use 'fetch' and have SSR site
    this.loading = true;
    try {
      const {
        flags,
        name,
        tld,
        population,
        currencies,
        region,
        subregion,
        languages,
        capital,
        borders,
      } = (await this.$axios.get(`/name/${this.$route.params.name}`)).data[0];
      if (borders?.length) {
        const borderCountries = (
          await this.$axios.get('/alpha', {
            params: {
              codes: borders.join(','),
            },
          })
        ).data;
        borderCountries.forEach(border => {
          this.borderCountries.push(border.name.common);
        });
      }
      this.flagImgSrc = flags.svg;
      this.flagAlt = flags.alt;
      this.name = name.common;
      this.nativeName = Object.values(name.nativeName)?.[0]?.common;
      this.topLevelDomains = tld;
      this.population = population;
      this.currencies = Object.values(currencies).map(
        currency => currency.name
      );
      this.region = region;
      this.langs = Object.values(languages);
      this.subRegion = subregion;
      this.capital = capital?.[0] || 'Not Entered';

      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.showError = true;
      this.errorText = err.response.data.message || err.message;
    }
  },
};
</script>
