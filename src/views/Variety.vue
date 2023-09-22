<script>
import BilibiliList from "@/components/BilibiliList.vue";
import IqiyiList from "@/components/IqiyiList.vue";
import MgtvList from "@/components/MgtvList.vue";
import QQList from "@/components/QQList.vue";
import YoukuList from "@/components/YoukuList.vue";
import {useBilibiliList} from "@/stores/bilibili-list";
import {useIqiyiList} from "@/stores/iqiyi-list";
import {useMgtvList} from "@/stores/mgtv-list";
import {usePageHeader} from "@/stores/page-header";
import {useQQList} from "@/stores/qq-list";
import {useYoukuList} from "@/stores/youku-list";
import {TabPane, Tabs} from "view-ui-plus";

export default {
  name: 'VarietyView',
  components: {BilibiliList, IqiyiList, YoukuList, QQList, MgtvList, TabPane, Tabs},
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
      title: '综艺',
    });
    useIqiyiList().set({
      channelId: 6,
    })
    useQQList().set({
      channelId: 100109,
      sort: 23,
    });
    useYoukuList().set({
      type: 'variety'
    });
    useMgtvList().set({
      channelId: 1,
    });
    useBilibiliList().set({
      type: 'variety',
    })
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
      <IqiyiList/>
    </div>
  </TabPane>
  <TabPane label="腾讯">
    <div v-if="tagName === 1">
      <QQList/>
    </div>
  </TabPane>
  <TabPane label="优酷">
    <div v-if="tagName === 2">
      <YoukuList/>
    </div>
  </TabPane>
  <TabPane label="芒果">
    <div v-if="tagName === 3">
      <MgtvList/>
    </div>
  </TabPane>
  <TabPane label="Bilibili">
    <div v-if="tagName === 4">
      <BilibiliList/>
    </div>
  </TabPane>
</Tabs>
</template>

<style scoped>

</style>
