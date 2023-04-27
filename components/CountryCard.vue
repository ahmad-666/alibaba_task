<template>
  <v-card class="shadow-1 rounded-lg overflow-hidden primary">
    <v-card-title class="d-block pa-0">
      <div v-intersect.once="{ threshold: 0.5, handler: intersectionHandler }">
        <CircleLoader v-if="!isImgIntersected" :size="75" />
        <img
          v-else
          :src="flagImgSrc"
          :alt="imgAlt"
          class="width-100"
          :style="{
            aspectRatio: '4 / 3',
            maxHeight: '200px',
          }"
        />
      </div>

      <!-- <v-img
          :src="flagImgSrc"
          width="100%"
          :height="200"
          :alt="imgAlt"
          class="bg-size-100"
          aspect-ratio="10/1"
        ></v-img> -->
    </v-card-title>
    <v-card-text class="pt-7 px-5 pb-12">
      <h4 class="text-h5 accent--text">{{ name }}</h4>
      <div class="mt-4">
        <div
          v-for="item in items"
          :key="item.title"
          class="d-flex align-center my-2"
        >
          <p class="text-body-2 font-weight-bold accent--text text-capitalize">
            {{ item.title }}:
          </p>
          <p class="ml-2 text-body-2 accent--text">{{ item.value }}</p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import CircleLoader from '~/components/CircleLoader.vue';
export default {
  components: {
    CircleLoader,
  },
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
    population: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    capital: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isImgIntersected: false,
    };
  },
  computed: {
    items() {
      return [
        {
          title: 'population',
          value: new Intl.NumberFormat().format(this.population),
        },
        {
          title: 'region',
          value: this.region,
        },
        {
          title: 'capital',
          value: this.capital,
        },
      ];
    },
  },
  methods: {
    intersectionHandler(entries, observer, isIntersecting) {
      if (isIntersecting) {
        this.isImgIntersected = true;
      }
    },
  },
};
</script>
