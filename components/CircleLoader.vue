<template>
  <v-progress-circular
    :size="size"
    color="purple"
    indeterminate
    class="d-block mx-auto"
  ></v-progress-circular>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 150,
    },
  },
};
</script>
