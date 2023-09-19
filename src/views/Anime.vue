<script>
import Anime1Anime from "@/components/anime/Anime1Anime.vue";
import AnimeCalendar from "@/components/anime/AnimeCalendar.vue";
import BangumiAnime from "@/components/anime/BangumiAnime.vue";
import BilibiliAnime from "@/components/anime/BilibiliAnime.vue";
import PoxiaoAnime from "@/components/anime/PoxiaoAnime.vue";
import SubjectList from "@/components/SubjectList.vue";
import {usePageHeader} from "@/stores/page-header";
import {TabPane} from 'view-ui-plus';

export default {
  name: 'anime-view',
  components: {PoxiaoAnime, BilibiliAnime, Anime1Anime, BangumiAnime, AnimeCalendar, SubjectList, TabPane },
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
    <TabPane label="Bilibili">
      <div v-if="tagName === 4">
        <BilibiliAnime/>
      </div>
    </TabPane>
    <TabPane label="破晓">
      <div v-if="tagName === 5">
        <PoxiaoAnime/>
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
