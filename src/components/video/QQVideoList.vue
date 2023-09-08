<script>
import {useSubjectList} from "@/stores/subject-list";
import {Image} from "view-ui-plus";

export default {
  name: "IqiyiVideoList",
  components: {Image},
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
      fetch(`https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "page_context": {
            "page_index": String(this.pageCurr-1)
          },
          "page_params": {
            "page_id": "channel_list_second_page",
            "page_type": "operation",
            "channel_id": "100113",
            "filter_params": "ifeature=-1&iarea=-1&iyear=-1&ipay=-1&sort=79",
            "page": String(this.pageCurr-1)
          },
          "page_bypass_params": {
            "params": {
              "page_id": "channel_list_second_page",
              "page_type": "operation",
              "channel_id": "100113",
              "filter_params": "ifeature=-1&iarea=-1&iyear=-1&ipay=-1&sort=79",
              "page": String(this.pageCurr-1),
              "caller_id": "3000010",
              "platform_id": "2",
              "data_mode": "default",
              "user_mode": "default"
            },
            "scene": "operation",
            "abtest_bypass_id": "7ea5673d46432814"
          }
        })
      })
          .then(d => d.json())
          .then(res => {
            let cardList = null;
            if (res.data.CardList.length === 2) {
              cardList = res.data.CardList[1];
            } else {
              cardList = res.data.CardList[0];
            }
            this.total = Number(cardList.params.total_video);
            this.listData = [];
            for (const card of cardList.children_list.list.cards) {
              this.listData.push(card.params)
            }
            this.spinShow = false;
          });
    },
    openPage(cid) {
      window.open(`https://v.qq.com/x/cover/${cid}.html`)
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
        :xxl="4"
        style="margin: 12px 0"
    >
      <Card style="height: 100%;">
        <template #title>
          <p v-line-clamp="1" style="word-break: break-all">
            {{ row.title }}
          </p>
          <Text type="secondary">{{ row.second_title }}</Text>
        </template>
        <Row :gutter="24">
          <Col :xs="24" :sm="24" :md="24" @click="openPage(row.cid)" style="cursor: pointer">
            <Image
                :src="
                row.new_pic_vt ||
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
              <span style="position: absolute; left: 5px">{{ row.timelong }}</span>
            </Text>
          </Col>
          <Col :xs="24" :sm="24" :md="24">
            <p style="margin-top: 8px;">
              <Text>上映时间：{{ row.publish_date }}</Text>
            </p>
            <div v-if="row.description" style="margin-top: 8px">
              <Paragraph type="secondary" ellipsis :ellipsisConfig="{tooltip: true, rows: 6}">{{ row.summary }}</Paragraph>
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
