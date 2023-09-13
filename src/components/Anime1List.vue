<template>
  <Space direction="vertical" style="width: 100%">
    <Table :columns="columns" :data="tableData"></Table>
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
  </Space>
</template>

<script>
import {Card, Page, Space} from "view-ui-plus";
export default {
  name: "Anime1List",
  components: {Page, Card, Space},
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
      animeData: [],
      columns: [
        {
          title: '动画名称',
          key: 'name',
          render: (h, params) => {
            return h(
                'a',
                {
                  onclick: (event) => {
                    event.preventDefault();
                    this.goDetail(params.row.id)
                  }
                },
                params.row.name
            );
          },
        }, {
          title: '集数',
          key: 'eps',
        }, {
          title: '年份',
          key: 'year',
          width: 70,
        }, {
          title: '季',
          key: 'season',
          width: 50,
        }, {
          title: '字幕组',
          key: 'group',
        }
      ],
      tableData: [],
      pageSize: 12,
      pageCurr: 1,
      total: 0,
      keyword: '',
    };
  },
  created() {
    this.pageSize = Number(this.$route.query.size) || this.pageSize;
    this.pageCurr = Number(this.$route.query.num) || this.pageCurr;
    this.search = this.$route.query.search;
    this.season = this.$route.query.season;

    fetch(`${this.baseUrl}/anime1-data.json`)
        .then(d => d.json())
        .then(d => {
          this.animeData = d

          this.getTableData()
        })
  },
  watch: {
    '$route.query'() {
      this.search = this.$route.query.search;
      this.pageSize = Number(this.$route.query.size) || 12;
      this.pageCurr = Number(this.$route.query.num ) || 1;
      this.getTableData();
    },
    search(s) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          search: s,
          num: 1,
        })
      });
    },
    season(s) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          season: s
        })
      });
    },
  },
  methods: {
    getTableData() {
      const search = this.$route.query.search;
      const season = this.$route.query.season;

      this.tableData = this.animeData
          .filter((d) => {
            return !search || d.name.indexOf(search) !== -1;
          })
          .filter((d) => {
            return !season || d.season === season;
          });

      this.total = this.tableData.length;
      this.tableData = this.tableData.slice(
          this.pageSize * (this.pageCurr - 1),
          this.pageSize * this.pageCurr
      );
    },
    pageChange() {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          size: this.pageSize,
          num: this.pageCurr,
        })
      })
    },
    goDetail(id) {
      this.$router.push(`/anime1/detail?id=${id}`)
    },
  },
}
</script>

<style scoped>

</style>
