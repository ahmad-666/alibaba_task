<template>
  <div>
    <v-row align="center">
      <v-col cols="12" md="6">
        <img
          :src="flagImgSrc"
          :alt="imgAlt"
          class="width-100"
          :style="{
            aspectRatio: '4 / 3',
            maxHeight: '400px',
          }"
        />
        <!-- <v-img
          :src="flagImgSrc"
          width="100%"
          height="auto"
          max-height="400"
          class="bg-size-100"
        ></v-img> -->
      </v-col>
      <v-col cols="12" md="6" class="accent--text">
        <h1 class="text-h1">{{ name }}</h1>
        <v-row class="mt-4" :dense="!$vuetify.breakpoint.mobile">
          <v-col
            v-for="item in items"
            :key="item.title"
            cols="12"
            sm="6"
            class="d-flex align-center"
          >
            <p class="text-body-2 font-weight-bold text-capitalize">
              {{ item.title }}:
            </p>
            <p class="ml-2 text--lighten-2 text-body-2">{{ item.value }}</p>
          </v-col>
          <v-col cols="12" class="d-flex align-center">
            <p class="text-body-2 font-weight-bold text-capitalize">capital:</p>
            <p class="ml-2 text--lighten-2 text-body-2">{{ capital }}</p>
          </v-col>
        </v-row>
        <div
          v-if="borderCountries.length"
          class="d-block d-sm-flex align-center mt-10"
        >
          <h6 class="text-body-2 font-weight-bold accent--text text-capitalize">
            border countries:
          </h6>
          <div class="d-flex flex-wrap mt-4 mt-sm-0 ml-0 ml-sm-4">
            <v-chip
              v-for="country in borderCountries"
              :key="country"
              nuxt
              :to="`/countries/${country}`"
              color="primary"
              class="shadow-1 rounded-0 ma-2 transparent px-5 accent--text"
            >
              {{ country }}
            </v-chip>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    flagImgSrc: {
      type: String,
      required: true,
    },
    imgAlt: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nativeName: {
      type: String,
      required: true,
    },
    topLevelDomains: {
      type: Array,
      default: () => [],
    },
    population: {
      type: Number,
      required: true,
    },
    currencies: {
      type: Array,
      default: () => [],
    },
    region: {
      type: String,
      required: true,
    },
    langs: {
      type: Array,
      default: () => [],
    },
    subRegion: {
      type: String,
      required: true,
    },
    capital: {
      type: String,
      required: true,
    },
    borderCountries: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    items() {
      return [
        {
          title: 'native name',
          value: this.nativeName,
        },
        {
          title: 'top level domain',
          value: this.topLevelDomains.join(', '),
        },
        {
          title: 'population',
          value: new Intl.NumberFormat().format(this.population),
        },
        {
          title: 'currencies',
          value: this.currencies.join(', '),
        },
        {
          title: 'region',
          value: this.region,
        },
        {
          title: 'languages',
          value: this.langs.join(', '),
        },
        {
          title: 'sub region',
          value: this.subRegion,
        },
      ];
    },
  },
};
</script>
