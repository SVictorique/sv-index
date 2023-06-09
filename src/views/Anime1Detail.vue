<template>
  <button v-for="i in data.eps" :key="i">
    {{ i }}
  </button>
</template>

<script>
import {usePageHeader} from "@/stores/page-header";

export default {
  name: "Anime1Detail",
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
      id: null,
      data: {},
    };
  },
  beforeMount() {
    this.id = this.$route.query.id

    fetch(`${this.baseUrl}/anime1-data.json`)
        .then(d => d.json())
        .then(d => {
          this.data = d.find(d => d.id == this.id)

          usePageHeader().set({
            show: true,
            title: this.data.name,
          });
        })
  },
  methods: {
    parseEps(eps) {
      if (eps.indexOf('(') !== -1) {
        return Number(eps.substring(eps.indexOf('(') + 1, eps.indexOf(')')))
      } else {
        return Number(eps.substring())
      }
    }
  },
}
</script>

<style scoped>

</style>
