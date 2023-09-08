<template>
  <Table :columns="columns" :data="tableData"></Table>
</template>

<script>
import {Table} from "view-ui-plus";
export default {
  name: "Anime1View",
  components: {Table},
  data() {
    return {
      columns: [
        {
          title: '名称',
          key: 'name',
        }, {
          title: '集数',
          key: 'eps',
        }, {
          title: '年份',
          key: 'year',
        }, {
          title: '季',
          key: 'season',
        }, {
          title: '字幕组',
          key: 'group',
        }
      ],
      tableData: [],
    };
  },
  async beforeMount() {
    this.tableData = (await this.$common.getAnime1Data())
        .map(d => ({
          id: d[0],
          name: d[1],
          eps: d[2],
          year: d[3],
          season: d[4],
          group: d[5]
        }))
  }
}
</script>

<style scoped>

</style>
