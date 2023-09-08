<script>
import {useSubjectList} from "@/stores/subject-list";
import {Image, List, ListItem, Text} from "view-ui-plus";

export default {
  name: "IqiyiVideoList",
  components: {Text, ListItem, List, Image},
  data() {
    return {
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
      fetch(`https://mesh.if.iqiyi.com/portal/videolib/pcw/data?ret_num=999999&page_id=1&channel_id=2&mode=4`, {
        method: 'get',
      })
          .then(d => d.json())
          .then(res => {
            this.total = res.data.length;
            this.originData = res.data;
            this.spinShow = false;

            for (const d of this.originData) {
              d.cover_url = `${this.baseUrl}/iqiyi${d.image_url_normal.substring(d.image_url_normal.indexOf("/image/"))}`
            }

            this.listData = this.originData.slice(
                this.pageSize * (this.pageCurr - 1),
                this.pageSize * this.pageCurr
            )
          });
    },
    openPage(url) {
      window.open(url)
    },
    fetchPersonInfo(id) {
      fetch(`https://pcw-api.iqiyi.com/strategy/pcw/data/playQiguanRightSide?entity_id=${id}`)
          .then(res => res.json())
          .then(res => {
            console.log(res)
          })
    },
  },
  beforeMount() {
    this.type = useSubjectList().type;
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
        :xxl="8"
        style="margin: 12px 0"
    >
      <Card style="height: 100%;">
        <template #title>
          <p v-line-clamp="1" style="word-break: break-all">
            {{ row.title }}
          </p>
          <Text type="secondary">{{ row.desc }}</Text>
        </template>
        <Row :gutter="24">
          <Col :xs="24" :sm="24" :md="24" :xxl="8" @click="openPage(row.page_url)" style="cursor: pointer">
            <Image
                :src="
                row.cover_url ||
                'https://lain.bgm.tv/img/no_icon_subject.png'
              "
                fit="cover"
                :alt="row.title"
                style="width: 100%"
            >
              <template #error>
                <Image
                    src="https://lain.bgm.tv/img/no_icon_subject.png"
                    fit="cover"
                    :alt="row.title"
                    style="width: 100%"
                >
                </Image>
              </template>
            </Image>
            <Text
                style="position: absolute; bottom: 0px; left: 12px; right: 12px; height: 30px; line-height: 30px; z-index: 1; color: #fff; font-size: 14px; font-weight: bold; background-color: rgba(0, 0, 0, 0.3); text-align: right;"
            >
              <span style="position: absolute; left: 5px">{{ row.dq_updatestatus || '无' }}</span>
              <span style="position: absolute; right: 5px">热度：{{ row.hot_score || '无' }}</span>
            </Text>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :xxl="16">
            <p style="margin-top: 8px;">
              <Text>上映时间：{{ row.showDate }}</Text>
            </p>
            <div style="margin-top: 8px">
              <span v-for="(item, index) in row.contributor" :key="item.id">
                <Link @click="fetchPersonInfo(item.id)" style="width: auto; display: inline-block">
                  {{ item.name }}
                </Link>
                <Text v-if="index < row.contributor.length - 1"> / </Text>
              </span>
            </div>
            <div v-if="row.description" style="margin-top: 8px">
              <Paragraph type="secondary" ellipsis :ellipsisConfig="{tooltip: false, rows: 6}">{{ row.description }}</Paragraph>
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
