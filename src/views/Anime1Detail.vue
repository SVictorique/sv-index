<template>
  <button v-for="i in parseEps(data.eps)" :key="i" @click="open(`https://miru.v.anime1.me/${id}/${index}b.mp4`)">
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
      index: 1,
    };
  },
  created() {
    this.id = this.$route.query.id

    fetch(`${this.baseUrl}/anime1-data.json`)
        .then(d => d.json())
        .then(d => {
          this.data = d.find(d => d.id === Number(this.id))
          console.log(this.data)
          usePageHeader().set({
            show: true,
            title: this.data.name,
          });
        })
  },
  methods: {
    parseEps(eps) {
      if (!eps) {
        return 0
      }
      if (eps.indexOf('(') !== -1) {
        return Number(eps.substring(eps.indexOf('(') + 1, eps.indexOf(')')))
      } else {
        return Number(eps.substring(eps.indexOf('-') +1, eps.length))
      }
    },
    open(url) {
      window.open(url, '_blank')
    }
  },
}
</script>

<style scoped>

</style>
