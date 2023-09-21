<script>
import Anime1Anime from "@/components/anime/Anime1Anime.vue";
import AnimeCalendar from "@/components/anime/AnimeCalendar.vue";
import BangumiAnime from "@/components/anime/BangumiAnime.vue";
import BilibiliList from "@/components/BilibiliList.vue";
import IqiyiList from "@/components/IqiyiList.vue";
import MgtvList from "@/components/MgtvList.vue";
import PoxiaoList from "@/components/PoxiaoList.vue";
import QQList from "@/components/QQList.vue";
import SubjectList from "@/components/SubjectList.vue";
import YoukuList from "@/components/YoukuList.vue";
import {useBilibiliList} from "@/stores/bilibili-list";
import {useIqiyiList} from "@/stores/iqiyi-list";
import {useMgtvList} from "@/stores/mgtv-list";
import {usePageHeader} from "@/stores/page-header";
import {usePoxiaoList} from "@/stores/poxiao-list";
import {useQQList} from "@/stores/qq-list";
import {useYoukuList} from "@/stores/youku-list";
import {TabPane, Tabs} from 'view-ui-plus';

export default {
  name: 'anime-view',
  components: {
    Tabs,
    BilibiliList,
    MgtvList,
    IqiyiList,
    QQList,
    YoukuList, PoxiaoList, Anime1Anime, BangumiAnime, AnimeCalendar, SubjectList, TabPane },
  data() {
    return {
      tagName: 0,
    }
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
      title: '动画',
    });
    useIqiyiList().set({
      channelId: 4,
    })
    useQQList().set({
      channelId: 100119,
      sort: 79,
    })
    usePoxiaoList().set({
      type: 'anime',
    });
    useYoukuList().set({
      type: 'anime'
    });
    useMgtvList().set({
      channelId: 50,
    });
    useBilibiliList().set({
      type: 'anime',
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
};
</script>

<template>
  <Tabs v-model="tagName" @on-click="tabChange">
    <TabPane label="新番时间表">
      <div v-if="tagName === 0">
        <AnimeCalendar/>
      </div>
    </TabPane>
    <TabPane label="全部动画">
      <div v-if="tagName === 1">
        <BangumiAnime/>
      </div>
    </TabPane>
    <TabPane label="bgm动画">
      <div v-if="tagName === 2">
        <SubjectList />
      </div>
    </TabPane>
    <TabPane label="Anime1">
      <div v-if="tagName === 3">
        <Anime1Anime/>
      </div>
    </TabPane>
    <TabPane label="爱奇艺">
      <div v-if="tagName === 4">
        <IqiyiList/>
      </div>
    </TabPane>
    <TabPane label="腾讯">
      <div v-if="tagName === 5">
        <QQList/>
      </div>
    </TabPane>
    <TabPane label="优酷">
      <div v-if="tagName === 6">
        <YoukuList/>
      </div>
    </TabPane>
    <TabPane label="芒果">
      <div v-if="tagName === 7">
        <MgtvList/>
      </div>
    </TabPane>
    <TabPane label="Bilibili">
      <div v-if="tagName === 8">
        <BilibiliList/>
      </div>
    </TabPane>
    <TabPane label="破晓">
      <div v-if="tagName === 9">
        <PoxiaoList/>
      </div>
    </TabPane>
  </Tabs>
</template>

<style scoped>
.ivu-form-item {
  margin-bottom: 0;
}
.spin-icon-load{
  animation: ani-spin 1s linear infinite;
}
@keyframes ani-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
</style>
<style>
.summary-tooltip {
  min-width: 50%;
  max-height: 300px;
  overflow: auto;
}
.ivu-grid-item-main {
  height: 100%;
}
.ivu-poptip-rel {
  width: 100%;
}
</style>
