<script>
import BilibiliList from "@/components/BilibiliList.vue";
import IqiyiList from "@/components/IqiyiList.vue";
import MgtvList from "@/components/MgtvList.vue";
import PoxiaoList from "@/components/PoxiaoList.vue";
import QQList from "@/components/QQList.vue";
import YoukuList from "@/components/YoukuList.vue";
import {useBilibiliList} from "@/stores/bilibili-list";
import {useIqiyiList} from "@/stores/iqiyi-list";
import {useMgtvList} from "@/stores/mgtv-list";
import {usePageHeader} from "@/stores/page-header";
import {usePoxiaoList} from "@/stores/poxiao-list";
import {useQQList} from "@/stores/qq-list";
import {useYoukuList} from "@/stores/youku-list";
import {TabPane, Tabs} from "view-ui-plus";

export default {
  name: 'TeleplayView',
  components: {BilibiliList, IqiyiList, YoukuList, QQList, PoxiaoList, MgtvList, TabPane, Tabs},
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
    useIqiyiList().set({
      channelId: 2,
    })
    useQQList().set({
      channelId: 100113,
      sort: 79,
    });
    useYoukuList().set({
      type: 'teleplay'
    });
    useMgtvList().set({
      channelId: 2,
    });
    useBilibiliList().set({
      type: 'teleplay'
    })
    usePoxiaoList().set({
      type: 'teleplay'
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
  <TabPane label="破晓">
    <div v-if="tagName === 5">
      <PoxiaoList/>
    </div>
  </TabPane>
</Tabs>
</template>

<style scoped>

</style>
