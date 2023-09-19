<script>
import BilibiliTeleplay from "@/components/teleplay/BilibiliTeleplay.vue";
import IqiyiTeleplay from "@/components/teleplay/IqiyiTeleplay.vue";
import MgtvTeleplay from "@/components/teleplay/MgtvTeleplay.vue";
import PoxiaoTeleplay from "@/components/teleplay/PoxiaoTeleplay.vue";
import QQTeleplay from "@/components/teleplay/QQTeleplay.vue";
import YoukuTeleplay from "@/components/teleplay/YoukuTeleplay.vue";
import {usePageHeader} from "@/stores/page-header";

export default {
  name: 'TeleplayView',
  components: {PoxiaoTeleplay, BilibiliTeleplay, MgtvTeleplay, YoukuTeleplay, QQTeleplay, IqiyiTeleplay},
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
    usePageHeader().set({
      show: true,
      title: '电视剧',
    });
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
      <IqiyiTeleplay/>
    </div>
  </TabPane>
  <TabPane label="腾讯">
    <div v-if="tagName === 1">
      <QQTeleplay/>
    </div>
  </TabPane>
  <TabPane label="优酷">
    <div v-if="tagName === 2">
      <YoukuTeleplay/>
    </div>
  </TabPane>
  <TabPane label="芒果">
    <div v-if="tagName === 3">
      <MgtvTeleplay/>
    </div>
  </TabPane>
  <TabPane label="Bilibili">
    <div v-if="tagName === 4">
      <BilibiliTeleplay/>
    </div>
  </TabPane>
  <TabPane label="破晓">
    <div v-if="tagName === 5">
      <PoxiaoTeleplay/>
    </div>
  </TabPane>
</Tabs>
</template>

<style scoped>

</style>
