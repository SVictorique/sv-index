<script>
import QQVideoList from "@/components/video/QQVideoList.vue";
import YoukuVideoList from "@/components/video/YoukuVideoList.vue";
import {TabPane, Tabs} from "view-ui-plus";
import IqiyiVideoList from "@/components/video/IqiyiVideoList.vue";

export default {
  name: 'VideoList',
  components: {YoukuVideoList, QQVideoList, Tabs, TabPane, IqiyiVideoList},
  data() {
    return {
      tagName: 0
    };
  },
  watch: {
    '$route.query'() {
      if (this.$route.query.tagName) {
        this.tagName = Number(this.$route.query.tagName)
      } else {
        this.tagName = 0
      }
    },
  },
  methods: {
    tabChange() {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          tagName: this.tagName,
        })
      })
    },
  },
  beforeMount() {
    if (this.$route.query.tagName) {
      this.tagName = Number(this.$route.query.tagName)
    } else {
      this.tagName = 0
    }
    this.$router.replace({
      query: Object.assign({}, this.$route.query, {
        tagName: this.tagName,
      })
    })
  }
}
</script>

<template>
<Tabs v-model="tagName" @on-click="tabChange">
  <TabPane label="爱奇艺">
    <div v-show="tagName === 0">
      <IqiyiVideoList/>
    </div>
  </TabPane>
  <TabPane label="腾讯">
    <div v-show="tagName === 1">
      <QQVideoList/>
    </div>
  </TabPane>
  <TabPane label="优酷">
    <div v-show="tagName === 2">
      <YoukuVideoList/>
    </div>
  </TabPane>
</Tabs>
</template>

<style scoped>

</style>
