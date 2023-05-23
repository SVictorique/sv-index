<template>
  <Row :gutter="8">
    <Col v-for="i in 7" :key="i" :span="3" :offset="1">
      <Space direction="vertical">
        <Row><Text>{{ days[i-1] }}</Text></Row>
        <Row
            v-for="item of calendarData[i-1]"
            :key="item.id"
            @click="$router.push(`/subject/${item.id}`)"
            style="cursor: pointer;"
        >
          <Image :src="item.images ? item.images.common : 'https://lain.bgm.tv/img/no_icon_subject.png'"></Image>
          <Text
              ellipsis
              style="position: absolute;
              bottom: 1px;
              left: 1px;
              right: 1px;
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
            {{ item.name_cn || item.name }}
          </Text>
        </Row>
      </Space>
    </Col>
  </Row>
</template>

<script>
import {Image, Space, Text} from "view-ui-plus";
export default {
  name: 'home-view',
  components: {Text, Space, Image},
  data() {
    return {
      days: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      calendarData: [],
    }
  },
  watch: {

  },
  methods: {

  },
  async beforeMount() {
    this.calendarData = [];
    for (let i = 0; i < 7; i++) {
      this.calendarData.push([]);
    }
    const data = await this.$common.getCalendar();
    for (const d of data) {
      this.calendarData[d.weekday.id - 1] = d.items;
    }
    console.log(this.calendarData)
  },
};
</script>

<style scoped>

</style>
