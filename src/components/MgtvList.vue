<script>
import {useMgtvList} from "@/stores/mgtv-list";
import {Image} from "view-ui-plus";

export default {
  name: "MgtvList",
  components: {Image},
  data() {
    return {
      channelId: 2,
      listData: [],
      originData: [],
      pageSize: 12,
      pageCurr: 1,
      spinShow: false,
      total: 0,
      baseUrl: import.meta.env.BASE_URL,
    }
  },
  watch: {
    '$route.query'() {
      this.pageCurr = Number(this.$route.query.num) || 1;
      this.fetchData();
    }
  },
  methods: {
    pageChange() {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          size: this.pageSize,
          num: this.pageCurr,
        })
      })
    },
    fetchData() {
      this.spinShow = true;
      const airDate = [];
      if (this.dateStart) {
        airDate.push(`>=${this.$Date(this.dateStart).format('YYYY-MM-DD')}`);
      }
      if (this.dateEnd) {
        airDate.push(`<=${this.$Date(this.dateEnd).format('YYYY-MM-DD')}`);
      }
      const rank = [];
      if (this.sort === 'rank') {
        rank.push('>0')
      }
      fetch(`https://pianku.api.mgtv.com/rider/list/pcweb/v3?allowedRC=1&platform=pcweb&channelId=${this.channelId}&pn=${this.pageCurr}&pc=${this.pageSize}&hudong=1&_support=10000000&kind=a1&area=a1&year=all&chargeInfo=a1&sort=c1`)
          .then(d => d.json())
          .then(res => {
            this.total = res.data.totalHits

            this.listData = res.data.hitDocs;
            this.spinShow = false;
          });
    },
    openPage(cid) {
      window.open(`https://www.mgtv.com/b/${cid}`)
    },
  },
  created() {
    this.channelId = useMgtvList().channelId
    this.limit = Number(this.$route.query.limit) || this.pageSize;
    this.offset = Number(this.$route.query.offset) || this.pageCurr;
    this.keyword = this.$route.query.keyword || this.keyword;
    this.sort = this.$route.query.sort || this.sort;
    this.dateStart = this.$route.query.dateStart || this.$common.getCurSeason();
    this.dateEnd = this.$route.query.dateEnd || this.dateEnd;
    this.fetchData();
  }
}
</script>

<template>
  <Row :gutter="24">
    <Col
        v-for="row in listData"
        :key="row.name"
        :xs="24"
        :sm="12"
        :md="8"
        :xl="6"
        :xxl="4"
        style="margin: 12px 0"
    >
      <Card style="height: 100%;">
        <template #title>
          <p v-line-clamp="1" style="word-break: break-all">
            {{ row.title }}
          </p>
          <Text type="secondary">{{ row.kind.join(' / ') }}</Text>
        </template>
        <Row :gutter="24">
          <Col :xs="24" :sm="24" :md="24" @click="openPage(row.clipId)" style="cursor: pointer">
            <Image
                :src="
                row.img ||
                'https://lain.bgm.tv/img/no_icon_subject.png'
              "
                fit="cover"
                :alt="row.title"
                style="width: 100%"
            >
              <template #error>
                <Icon type="ios-image-outline" size="24" />
              </template>
            </Image>
            <Text
                style="position: absolute; bottom: 0px; left: 12px; right: 12px; height: 30px; line-height: 30px; z-index: 1; color: #fff; font-size: 14px; font-weight: bold; background-color: rgba(0, 0, 0, 0.3); text-align: right;"
            >
              <span style="position: absolute; left: 5px">{{ row.updateInfo }}</span>
              <span style="position: absolute; right: 5px">评分：{{ row.zhihuScore || '无' }}</span>
            </Text>
          </Col>
          <Col :xs="24" :sm="24" :md="24">
            <p style="margin-top: 8px;">
              <Text>上映时间：{{ row.se_updateTime }}</Text>
            </p>
            <div style="margin-top: 8px">
              {{ row.subtitle }}
            </div>
            <div v-if="row.story" style="margin-top: 8px">
              <Paragraph type="secondary" ellipsis :ellipsisConfig="{tooltip: true, rows: 6}">{{ row.story }}</Paragraph>
            </div>
            <div v-else>
              <Text type="secondary">暂无说明</Text>
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
  <Spin fix :show="spinShow">
    <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
    <div>Loading</div>
  </Spin>
  <Card>
    <Page
        v-model="pageCurr"
        :total="total"
        :page-size="pageSize"
        show-sizer
        show-elevator
        @on-change="pageChange"
        @on-page-size-change="pageChange"
    />
  </Card>
</template>

<style scoped>

</style>
