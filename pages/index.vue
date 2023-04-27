<template>
  <div>
    <div class="main-section">
      <FilterSection
        :name.sync="nameFilter"
        :region.sync="regionFilter"
        :region-items="regionItems"
        :sort.sync="sortFilter"
        :sort-items="sortItems"
      />
      <div class="mt-5">
        <CircleLoader v-if="loading" />
        <p
          v-else-if="!countriesFiltered.length"
          class="text-h5 accent--text text-center"
        >
          No Results Find !!!
        </p>
        <v-row v-else align="stretch">
          <v-col
            v-for="country in countriesFiltered"
            :key="country.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="pa-3 pa-md-6"
          >
            <nuxt-link :to="`/countries/${country.name}`" class="fill-height">
              <CountryCard
                class="fill-height"
                :flag-img-src="country.flagImgSrc"
                :img-alt="country.imgAlt"
                :name="country.name"
                :population="country.population"
                :region="country.region"
                :capital="country.capital"
              />
            </nuxt-link>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-snackbar v-model="showError" color="error" dark>
      {{ errorText }}
    </v-snackbar>
  </div>
</template>

<script>
import CountryCard from '~/components/CountryCard.vue';
import FilterSection from '~/components/FilterSection.vue';
import CircleLoader from '~/components/CircleLoader.vue';
export default {
  components: {
    CountryCard,
    FilterSection,
    CircleLoader,
  },
  data() {
    return {
      loading: false,
      showError: false,
      errorText: null,
      countries: [],
      nameFilter: '',
      regionFilter: '',
      regionItems: [
        {
          text: 'Africa',
          value: 'Africa',
        },
        {
          text: 'America',
          value: 'Americas',
        },
        {
          text: 'Asia',
          value: 'Asia',
        },
        {
          text: 'Europe',
          value: 'Europe',
        },
        {
          text: 'Oceania',
          value: 'Oceania',
        },
      ],
      sortFilter: '',
      sortItems: [
        {
          text: 'Country [A-Z]',
          value: 'country-a-z',
        },
        {
          text: 'Country [Z-A]',
          value: 'country-z-a',
        },
        {
          text: 'Lowest Population',
          value: 'population-low',
        },

        {
          text: 'Highest Population',
          value: 'population-high',
        },
      ],
    };
  },
  computed: {
    countriesFiltered() {
      return this.countries
        .filter(
          country =>
            country.name
              .toLowerCase()
              .includes(this.nameFilter?.toLowerCase() || '') &&
            country.region
              .toLowerCase()
              .includes(this.regionFilter?.toLowerCase() || '')
        )
        .sort((country1, country2) => {
          if (
            this.sortFilter === 'country-a-z' &&
            country2.name > country1.name
          )
            return -1;
          else if (
            this.sortFilter === 'country-z-a' &&
            country1.name > country2.name
          )
            return -1;
          else if (
            this.sortFilter === 'population-low' &&
            country2.population > country1.population
          )
            return -1;
          else if (
            this.sortFilter === 'population-high' &&
            country1.population > country2.population
          ) {
            return -1;
          } else return 0;
        });
    },
  },
  watch: {
    countriesFiltered: {
      deep: true,
      immediate: false,
      handler(val) {
        this.generateUrlQueries();
      },
    },
    '$route.query': {
      deep: true,
      handler(val) {
        // only for handle click on home page
        if (!val.region && !val.search && !val.sort) {
          this.nameFilter = '';
          this.regionFilter = '';
          this.sortFilter = '';
        }
      },
    },
  },
  async created() {
    // Use created because api needed VPN ... else we could use 'fetch' and have SSR site
    this.readUrlQueries();
    await this.fetchCountries();
  },
  methods: {
    async fetchCountries() {
      this.loading = true;
      try {
        const countries = (await this.$axios.get('/all')).data;
        this.countries = [];
        countries.forEach(country => {
          this.countries.push({
            id: country.name.common,
            flagImgSrc: country.flags.png,
            imgAlt: country.flags.alt || country.name.common,
            name: country.name.common,
            population: country.population,
            region: country.region,
            capital: country.capital?.[0] || 'Not Enter',
          });
        });
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.showError = true;
        this.errorText = err.response.data.message || err.message;
      }
    },
    readUrlQueries() {
      const { search, region, sort } = this.$route.query;
      this.nameFilter = search || '';
      this.regionFilter = region || '';
      this.sortFilter = sort || '';
    },
    generateUrlQueries() {
      this.$router
        .replace({
          path: this.$route.path,
          query: {
            search: this.nameFilter || undefined,
            region: this.regionFilter || undefined,
            sort: this.sortFilter || undefined,
          },
        })
        .catch(() => {});
    },
  },
};
</script>
