<template>
  <div class="container">
    <Row :gutter="8">
      <Col v-for="i in 7" :key="i" :xs="12" :sm="6" :xl="3">
        <List border>
          <template #header>
            <h2 style="text-align: center">{{ days[i-1] }}</h2>
          </template>
          <ListItem
              v-for="item of calendarData[i-1]"
              :key="item.id"
              @click="$router.push(`/subject/${item.id}`)"
              style="cursor: pointer; padding: 0; margin-top: 10px">
            <Image
                :src="item.images ? item.images.large : 'https://lain.bgm.tv/img/no_icon_subject.png'"
                style="width: 100%"
            ></Image>
            <Text
                ellipsis
                style="position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 30px;
              line-height: 30px;
              z-index: 1;
              color: #eee;
              font-size: 12px;
              font-weight: bold;
              background-color: rgba(0, 0, 0, 0.3);
              text-align: right;
              padding-right: 8px"
            >
              {{ item.name_cn || item.name }}
            </Text>
          </ListItem>
        </List>
      </Col>
    </Row>
  </div>
</template>

<script>
import {Image, ListItem, Text} from "view-ui-plus";
export default {
  name: 'AnimeCalendar',
  components: {ListItem, Text, Image},
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
  },
};
</script>

<style scoped>
@media screen and (min-width: 1200px) {
  .container {
    padding-left: 100px;
  }
}
</style>
