<template>
  <Card>
    <Form inline label-position="right" :label-width="100">
      <FormItem label="关键字">
        <Input
            v-model="keyword"
            placeholder="Keyword"
            clearable
            style="width: calc(100% - 60px)"
            @on-clear="filterChange"
            @on-enter="filterChange"
        ></Input>
        <Button type="primary" @click="filterChange">搜索</Button>
      </FormItem>
      <FormItem label="排序">
        <Select v-model="sort" @on-change="filterChange" clearable>
          <Option value="heat">热度</Option>
          <Option value="score">评分</Option>
          <Option value="rank">排名</Option>
        </Select>
      </FormItem>
      <FormItem label="时间">
        <DatePicker
            type="date"
            format="yyyy-MM-dd"
            v-model="dateStart"
            placeholder="Date Start"
            style="width: 200px"
            :options="dateStartOption"
            @on-change="filterChange"
        />
        <DatePicker
            type="date"
            format="yyyy-MM-dd"
            v-model="dateEnd"
            placeholder="Date End"
            style="width: 200px"
            :options="dateEndOption"
            @on-change="filterChange"
        />
      </FormItem>
    </Form>
  </Card>
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
            {{ row.name }}
          </p>
          <Text type="secondary">{{ row.name_cn }}</Text>
        </template>
        <Row :gutter="24">
          <Col :xs="24" :sm="24" :md="24" :xxl="8" @click="$router.push(`/subject/${row.id}`)" style="cursor: pointer">
            <Image
                :src="
                row.image ||
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
              <span style="position: absolute; left: 5px">排名：{{ row.rank || '无' }}</span>
              <span style="position: absolute; right: 5px">评分：{{ row.score || '无' }}</span>
            </Text>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :xxl="16">
            <p style="margin-top: 8px;">
              <Text>上映时间：{{ row.date }}</Text>
            </p>
            <div v-if="row.summary" style="margin-top: 8px">
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

<script>
import {useSubjectList} from "@/stores/subject-list";
import {FormItem, Option, Select, Button} from "view-ui-plus";

export default {
  name: "SubjectList",
  components: {Button, FormItem, Option, Select},
  data() {
    const that = this;
    return {
      type: 2,
      listData: [],
      pageSize: 12,
      pageCurr: 1,
      total: 0,
      keyword: '',
      sort: 'heat',
      dateStart: null,
      dateEnd: null,
      spinShow: false,
      dateStartOption: {
        disabledDate (date) {
          return date && that.dateEnd && date.valueOf() > that.dateEnd;
        }
      },
      dateEndOption: {
        disabledDate (date) {
          return date && that.dateStart && date.valueOf() < that.dateStart;
        }
      }
    };
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
    filterChange() {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          size: this.pageSize,
          num: 1,
          keyword: this.keyword,
          sort: this.sort,
          dateStart: this.dateStart ? this.$Date(this.dateStart).format('YYYY-MM-DD') : '',
          dateEnd: this.dateEnd ? this.$Date(this.dateEnd).format('YYYY-MM-DD') : '',
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
      fetch(`${this.$common.bgmApiRoot}/v0/search/subjects?limit=${this.pageSize}&offset=${(this.pageCurr - 1) * this.pageSize}`, {
        method: 'post',
        body: JSON.stringify({
          keyword: this.keyword,
          sort: this.sort,
          filter: {
            type: [this.type],
            NSFW: true,
            air_date: airDate,
            tag: [],
            rating: [],
            rank: rank,
          },
        })
      })
          .then(d => d.json())
          .then(res => {
            this.total = res.total;
            this.listData = res.data;
            this.spinShow = false;
          });
    },
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

<style scoped>
.ivu-form-item{
  margin-bottom: 8px;
}
</style>
