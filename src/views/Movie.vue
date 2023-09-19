<script>
import MgtvList from "@/components/MgtvList.vue";
import PoxiaoList from "@/components/PoxiaoList.vue";
import QQList from "@/components/QQList.vue";
import {useMgtvList} from "@/stores/mgtv-list";
import {usePageHeader} from "@/stores/page-header";
import {usePoxiaoList} from "@/stores/poxiao-list";
import {useQQList} from "@/stores/qq-list";
import {TabPane, Tabs} from "view-ui-plus";

export default {
  name: 'MovieList',
  components: {QQList, PoxiaoList, Tabs, MgtvList, TabPane},
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
      title: '电影',
    });
    useMgtvList().set({
      channelId: 3,
    });
    usePoxiaoList().set({
      type: 'movie',
    });
    useQQList().set({
      channelId: 100173,
      sort: 75,
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
  <TabPane label="腾讯">
    <div v-if="tagName === 0">
      <QQList/>
    </div>
  </TabPane>
  <TabPane label="芒果">
    <div v-if="tagName === 1">
      <MgtvList/>
    </div>
  </TabPane>
  <TabPane label="破晓">
    <div v-if="tagName === 2">
      <PoxiaoList/>
    </div>
  </TabPane>
</Tabs>
</template>

<style scoped>

</style>
