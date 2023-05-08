<template>
  <Row :gutter="24" style="margin-right: 0">
    <Col
        v-for="row in tableData"
        :key="row.title"
        :xs="24"
        :sm="24"
        :md="12"
        :xxl="8"
        style="margin: 24px 0"
    >
      <Card style="height: 100%">
        <template #title>
          <Poptip
              trigger="click"
              title="其他标题"
              placement="bottom"
              style="width: 100%"
          >
            <Tooltip
                :content="row.title"
                style="width: 100%"
                placement="bottom"
                max-width="100%"
            >
              <p v-line-clamp="1" style="word-break: break-all">
                {{ row.title }}
              </p>
              <Text type="secondary">{{ row.subTitle }}</Text>
            </Tooltip>
            <template #content>
              <Form :label-colon="true" :label-width="80">
                <FormItem
                    v-for="(s, k) in row.titleTranslate"
                    :key="s.id"
                    :label="parseLang(k)"
                >
                  《{{ s[0] }}》
                </FormItem>
              </Form>
            </template>
          </Poptip>
        </template>
        <Row :gutter="24">
          <Col :xs="24" :sm="24" :md="24" :xl="8">
            <Poptip
                trigger="click"
                title="播放源"
                placement="bottom"
                style="width: 100%"
            >
              <template #content>
                <p v-for="s in row.sites" :key="s.id">
                  <a
                      :href="siteData[s.site].urlTemplate.replace('{{id}}', s.id)"
                      target="_blank"
                  >
                    {{ siteData[s.site].title }}
                  </a>
                </p>
              </template>
              <Image
                  :src="
                  row.coverImgUrl ||
                  'https://lain.bgm.tv/img/no_icon_subject.png'
                "
                  fit="cover"
                  :alt="row.title"
              >
                <template #error>
                  <Icon type="ios-image-outline" size="24" color="#ccc" />
                </template>
              </Image>
            </Poptip>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :xl="16">
            <Form :label-colon="true" :label-width="50">
              <FormItem label="类型" class="ivu-text-left">
                {{ row.type }}
              </FormItem>
              <FormItem label="语种" class="ivu-text-left">
                {{ parseLang(row.lang) }}
              </FormItem>
              <FormItem label="官网">
                <a
                    v-line-clamp="1"
                    :href="row.officialSite"
                    target="_blank"
                    style="word-break: break-all"
                >
                  {{ row.officialSite }}
                </a>
              </FormItem>
              <FormItem label="首播">
                {{ $Date(row.begin).format('YYYY-MM-DD HH:mm:ss') }}
              </FormItem>
              <FormItem v-line-clamp="1" label="完结">
                {{
                  row.end
                      ? $Date(row.end).format('YYYY-MM-DD HH:mm:ss')
                      : '连载中'
                }}
              </FormItem>
              <template v-if="row.summary">
                <Tooltip
                    :content="row.summary"
                    style="width: 100%"
                    placement="top"
                    :max-width="400"
                    transfer-class-name="summary-tooltip"
                >
                  <p
                      v-line-clamp="5"
                      style="word-break: break-all; font-size: 12px"
                  >
                    <Text type="secondary">{{ row.summary }}</Text>
                  </p>
                </Tooltip>
              </template>
              <template v-else>
                <Text type="secondary">暂无说明</Text>
              </template>
            </Form>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
  <Spin fix :show="spinShow">
    <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
    <div>Loading</div>
  </Spin>
  <Page
      v-model="pageCurr"
      :total="total"
      :page-size="pageSize"
      show-sizer
      show-elevator
      @on-change="pageSizeChange"
      @on-page-size-change="pageSizeChange"
  />
</template>

<script>
import { Tooltip } from 'view-ui-plus';

export default {
  name: 'AnimeView',
  components: { Tooltip },
  data() {
    return {
      pageSize: 12,
      pageCurr: 1,
      animeData: [],
      siteData: {},
      tableData: [],
      spinShow: true,
      total: 0,
    }
  },
  watch: {
    '$route.query.search'() {
      this.getTableData();
    },
  },
  methods: {
    async getTableData() {
      const search = this.$route.query.search;
      this.tableData = this.animeData
          .filter((d) => !search || d.title.indexOf(search) !== -1);
      this.total = this.tableData.length;
      this.tableData = this.tableData.slice(
              this.pageSize * (this.pageCurr - 1),
              this.pageSize * this.pageCurr
          );
      for (const d of this.tableData) {
        let subjectId;
        for (const s of d.sites) {
          if (s.site === 'bangumi') {
            subjectId = s.id;
          }
        }

        if (!subjectId) {
          continue;
        }

        const subjectKey = 'sv-anime-subject';
        if (!localStorage.getItem(subjectKey)) {
          localStorage.setItem(subjectKey, JSON.stringify({}));
        }
        const subjectHis = JSON.parse(localStorage.getItem(subjectKey));

        let info;
        if (subjectHis[subjectId]) {
          info = subjectHis[subjectId];
        } else {
          try {
            info = await fetch(`https://api.bgm.tv/v0/subjects/${subjectId}`)
                .then((res) => {
                  if (!res.ok) {
                    throw new Error(res.status);
                  }
                  return res;
                })
                .then((res) => res.json());

            subjectHis[subjectId] = info;
            localStorage.setItem(subjectKey, JSON.stringify(subjectHis));
          } catch (e) { /* empty */ }
        }

        d.coverImgUrl = info.images.common;
        d.summary = info.summary;
        d.subTitle = info.name_cn;
      }
    },
    pageSizeChange() {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          size: this.pageSize,
          num: this.pageCurr,
        })
      })
      this.getTableData();
    },
    parseLang(lang) {
      if (lang === 'ja') {
        return '日语';
      }
      if (lang === 'en') {
        return '英语';
      }
      if (lang === 'zh-Hans') {
        return '简中';
      }
      if (lang === 'zh-Hant') {
        return '繁中';
      }
      return lang;
    },
  },
  async beforeMount() {
    this.pageSize = Number(this.$route.query.size) || this.pageSize;
    this.pageCurr = Number(this.$route.query.num) || this.pageCurr;

    let bangumiData;
    const storageKey = 'sv-anime-data';
    const hisDataStr = localStorage.getItem(storageKey);
    let needFetch = true;
    if (hisDataStr) {
      const hisData = JSON.parse(hisDataStr);
      if (Date.now() - hisData.date < 1000 * 60 * 60 * 24) {
        bangumiData = hisData.bangumiData;
        needFetch = false;
      }
    }
    if (needFetch) {
      bangumiData = await fetch('https://unpkg.com/bangumi-data@0.3/dist/data.json').then((res) => res.json());
      localStorage.setItem(storageKey, JSON.stringify({
        date: Date.now(),
        bangumiData,
      }));
    }
    this.siteData = bangumiData.siteMeta;
    this.animeData = bangumiData.items.reverse();
    await this.getTableData();
    this.spinShow = false;
  },
};
</script>

<style scoped>
.ivu-form-item {
  margin-bottom: 0;
}
.spin-icon-load{
  animation: ani-spin 1s linear infinite;
}
@keyframes ani-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
</style>
<style>
.summary-tooltip {
  min-width: 50%;
  max-height: 300px;
  overflow: auto;
}
.ivu-grid-item-main {
  height: 100%;
}
</style>
