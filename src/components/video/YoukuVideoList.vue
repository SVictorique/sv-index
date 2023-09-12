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
      fetch(`${this.baseUrl}/youku/video-data.json`, {
        method: 'get',
      })
          .then(d => d.json())
          .then(data => {
            this.total = data.length;
            this.originData = data;
            this.spinShow = false;

            this.listData = this.originData.slice(
                this.pageSize * (this.pageCurr - 1),
                this.pageSize * this.pageCurr
            )
          });
    },
    openPage(url) {
      window.open(url)
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
          <Text type="secondary">{{ row.subTitle }}</Text>
        </template>
        <Row :gutter="24">
          <Col :xs="24" :sm="24" :md="24" :xxl="8" @click="openPage(row.url)" style="cursor: pointer">
            <Image
                :src="
                row.cover ||
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
              <span style="position: absolute; left: 5px">{{ row.updateStatus || '无' }}</span>
            </Text>
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
