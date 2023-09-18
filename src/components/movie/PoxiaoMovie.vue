<script>
import {useSubjectList} from "@/stores/subject-list";
import {Image, Space, Text} from "view-ui-plus";

export default {
  name: "PoxiaoMovieList",
  components: {Space, Text, Image},
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
      fetch(`${this.baseUrl}/poxiao-movie.json`)
          .then(d => d.json())
          .then(res => {
            console.log(res)
            this.total = res.length

            this.originData = res;
            this.spinShow = false;

            this.listData = this.originData.slice(
                this.pageSize * (this.pageCurr - 1),
                this.pageSize * this.pageCurr
            )
          });
    },
    openPage(url) {
      window.open(url)
    }
  },
  created() {
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
        :xxl="4"
        style="margin: 12px 0"
    >
      <Card style="height: 100%;">
        <template #title>
          <p v-line-clamp="1" style="word-break: break-all">
            {{ row.name }}
          </p>
<!--          <Text type="secondary">{{ row.type }}</Text>-->
        </template>
        <Row :gutter="24">
          <Col :xs="24" :sm="24" :md="24" @click="openPage(row.link)" style="cursor: pointer">
            <Image
                :src="row.cover ||
                'https://lain.bgm.tv/img/no_icon_subject.png'
              "
                fit="cover"
                :alt="row.name"
                style="width: 100%"
            >
              <template #error>
                <Icon type="ios-image-outline" size="24" />
              </template>
            </Image>
            <Text
                style="position: absolute; bottom: 0px; left: 12px; right: 12px; height: 30px; line-height: 30px; z-index: 1; color: #fff; font-size: 14px; font-weight: bold; background-color: rgba(0, 0, 0, 0.3); text-align: right;"
            >
              <span style="position: absolute; left: 5px">{{ row.country }}</span>
              <span style="position: absolute; right: 5px">评分：{{ row.score || '无' }}</span>
            </Text>
          </Col>
          <Col :xs="24" :sm="24" :md="24">
            <p style="margin-top: 8px;">
              <Space direction="vertical">
                <Text>导演：{{ row.director }}</Text>
                <Text>类型：{{ row.type }}</Text>
                <Text>上映时间：{{ row.time }}</Text>
                <Text>演员：{{ row.performer }}</Text>
              </Space>
            </p>
            <!--            <div v-if="row.story" style="margin-top: 8px">
                          <Paragraph type="secondary" ellipsis :ellipsisConfig="{tooltip: true, rows: 6}">{{ row.story }}</Paragraph>
                        </div>
                        <div v-else>
                          <Text type="secondary">暂无说明</Text>
                        </div>-->
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
