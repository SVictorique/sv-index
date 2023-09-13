<script>
import MgtvVideoList from "@/components/video/MgtvVideoList.vue";
import QQVideoList from "@/components/video/QQVideoList.vue";
import YoukuVideoList from "@/components/video/YoukuVideoList.vue";
import {TabPane, Tabs} from "view-ui-plus";
import IqiyiVideoList from "@/components/video/IqiyiVideoList.vue";
import BilibiliVideoList from "@/components/video/BilibiliVideoList.vue";

export default {
  name: 'VideoList',
  components: {MgtvVideoList, YoukuVideoList, QQVideoList, Tabs, TabPane, IqiyiVideoList, BilibiliVideoList},
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
          num: 1,
        })
      })
    },
  },
  created() {
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
    <div v-if="tagName === 0">
      <IqiyiVideoList/>
    </div>
  </TabPane>
  <TabPane label="腾讯">
    <div v-if="tagName === 1">
      <QQVideoList/>
    </div>
  </TabPane>
  <TabPane label="优酷">
    <div v-if="tagName === 2">
      <YoukuVideoList/>
    </div>
  </TabPane>
  <TabPane label="芒果">
    <div v-if="tagName === 3">
      <MgtvVideoList/>
    </div>
  </TabPane>
  <TabPane label="Bilibili">
    <div v-if="tagName === 4">
      <BilibiliVideoList/>
    </div>
  </TabPane>
</Tabs>
</template>

<style scoped>

</style>
