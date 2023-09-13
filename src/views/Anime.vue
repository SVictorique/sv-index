<template>
  <Tabs v-model="tagName" @on-click="tabChange">
    <TabPane label="新番时间表">
      <div v-if="tagName === 0">
        <AnimeCalendar />
      </div>
    </TabPane>
    <TabPane label="全部动画">
      <div v-if="tagName === 1">
        <BangumiList />
      </div>
    </TabPane>
    <TabPane label="bgm动画">
      <div v-if="tagName === 2">
        <SubjectList />
      </div>
    </TabPane>
    <TabPane label="Anime1">
      <div v-if="tagName === 3">
        <Anime1List />
      </div>
    </TabPane>
    <TabPane label="Bilibili">
      <div v-if="tagName === 4">
        <BilibiliAnimeList />
      </div>
    </TabPane>
  </Tabs>
</template>

<script>
import Anime1List from "@/components/Anime1List.vue";
import AnimeCalendar from "@/components/AnimeCalendar.vue";
import BangumiList from "@/components/BangumiList.vue";
import BilibiliAnimeList from "@/components/BilibiliAnimeList.vue";
import SubjectList from "@/components/SubjectList.vue";
import {TabPane} from 'view-ui-plus';

export default {
  name: 'anime-view',
  components: {BangumiList, BilibiliAnimeList, Anime1List, SubjectList, AnimeCalendar, TabPane },
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
