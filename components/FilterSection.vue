<template>
  <div>
    <form>
      <div class="d-block d-sm-flex justify-space-between">
        <v-sheet
          color="transparent"
          :width="$vuetify.breakpoint.mobile ? '100%' : 400"
        >
          <v-text-field
            solo
            :value="name"
            class="input-shadow-1 accent--text font-weight-bold rounded-lg"
            background-color="primary"
            label="Search for a country"
            prepend-inner-icon="mdi-magnify"
            color="purple"
            clearable
            @input="$emit('update:name', $event)"
          ></v-text-field>
        </v-sheet>
        <v-sheet
          color="transparent"
          width="200"
          class="mt-4 mt-sm-0 ml-0 ml-sm-4"
        >
          <v-select
            solo
            class="input-shadow-1 font-weight-bold accent--text rounded-lg"
            background-color="primary"
            :value="region"
            :items="regionItems"
            label="Filter by region"
            clearable
            @input="$emit('update:region', $event)"
          >
            <template #item="{ item }">
              <p class="text-caption font-weight-bold accent--text">
                {{ item.text }}
              </p></template
            >
          </v-select>
          <v-select
            solo
            :value="sort"
            :items="sortItems"
            class="input-shadow-1 accent--text font-weight-bold rounded-lg mt-4"
            background-color="primary"
            label="Sort By"
            color="purple"
            clearable
            @input="$emit('update:sort', $event)"
          >
            <template #item="{ item }">
              <p class="text-caption font-weight-bold accent--text">
                {{ item.text }}
              </p></template
            >
          </v-select>
        </v-sheet>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    region: {
      type: String,
      default: '',
    },
    regionItems: {
      type: Array,
      default: () => [],
    },
    sort: {
      type: String,
      default: '',
    },
    sortItems: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:name', 'update:region', 'update:sort'],
};
</script>
