<template>
  <Space direction="vertical" size="large" class="container">
    <Card :bordered="false" v-for="subject in subjects" :key="subject.title">
      <template #title>{{ subject.title }}</template>
      <template #extra><Link @click="$router.push(subject.href)">更多</Link></template>
      <Row :gutter="8">
        <Col
            :xs="12"
            :sm="6"
            :lg="3"
            v-for="item in subject.data"
            :key="item.id"
            @click="$router.push(`/subject/${item.id}`)"
            style="cursor: pointer"
        >
          <Image
              :src="item.image || 'https://lain.bgm.tv/img/no_icon_subject.png'"
              style="width: 100%"
          ></Image>
          <Text
              ellipsis
              style="position: absolute;
              bottom: 0px;
              left: 4px;
              right: 4px;
              height: 30px;
              line-height: 30px;
              z-index: 1;
              color: #eee;
              font-size: 12px;
              font-weight: bold;
              background-color: rgba(0, 0, 0, 0.7);
              text-align: right;
              padding-right: 8px"
          >
            {{ item.name_cn || item.name }} {{ item.score }}
          </Text>
        </Col>
      </Row>
    </Card>
  </Space>
</template>

<script>
import {Card, Link} from "view-ui-plus";
export default {
  name: 'home-view',
  components: {Link, Card},
  data() {
    return {
      subjects: [{
        type: 2,
        title: '动画',
        href: '/anime',
        data: [],
      }, {
        type: 1,
        title: '书籍',
        href: '/book',
        data: [],
      }, {
        type: 3,
        title: '音乐',
        href: '/music',
        data: [],
      }, {
        type: 4,
        title: '游戏',
        href: '/game',
        data: [],
      }, {
        type: 6,
        title: '三次元',
        href: '/real',
        data: [],
      }],
    }
  },
  watch: {

  },
  methods: {
    async fetchTopData(type) {
      const date = new Date();
      let month;
      if (date.getMonth() < 4) {
        month = '01';
      } else if (date.getMonth() < 7) {
        month = '04';
      } else if (date.getMonth() < 10) {
        month = '07';
      } else {
        month = '10';
      }
      const res = await fetch(`${this.$common.bgmApiRoot}/v0/search/subjects?limit=8`, {
        method: 'post',
        body: JSON.stringify({
          sort: "heat",
          filter: {
            type: [type],
            NSFW: true,
            air_date: [
              `>=${date.getFullYear()}-${month}-01`,
            ]
          },
        })
      }).then(d => d.json());
      return res.data;
    },
  },
  async beforeMount() {
    for (const subject of this.subjects) {
      subject.data = await this.fetchTopData(subject.type);
    }
  },
};
</script>

<style scoped>
 .container {
   width: 100%;
   padding: 24px;
   margin: 0 auto;
 }
</style>
