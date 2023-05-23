<template>
  <PageHeader back hidden-breadcrumb @on-back="this.$router.go(-1)">
    <template #title>
      <Text>{{ info.platform }} {{ info.name }}</Text> <Text type="secondary">{{ info.name_cn }}</Text>
    </template>
  </PageHeader>
  <Row>
    <Col
        :xs="24"
        :sm="8"
        :xl="6"
        :xxl="4"
    >
      <Card>
        <Image
            :src="info.images?.common || 'https://lain.bgm.tv/img/no_icon_subject.png'"
            fit="cover"
            :alt="info.name"
            style="width: 100%; max-height: 800px;"
            preview
            :preview-list="[info.images?.large]"
            transfer
        >
          <template #error>
            <Icon type="ios-image-outline" size="24" />
          </template>
        </Image>
        <Form
            :label-width="100"
            :label-colon="true"
        >
          <FormItem
              v-for="row in info?.infobox"
              :key="row.index"
              :label="row.key"
              style="margin-bottom: 0"
          >
            <template v-if="Array.isArray(row.value)">
              <p v-for="v in row.value" :key="v.index">{{ v.v }}</p>
            </template>
            <template v-else-if="row.value.startsWith('http')">
              <a :href="row.value" target="_blank">{{ row.value }}</a>
            </template>
            <template v-else>
              {{ row.value }}
            </template>
          </FormItem>
        </Form>
      </Card>
    </Col>
    <Col
        :xs="24"
        :sm="16"
        :xl="18"
        :xxl="20"
    >
      <Tabs v-model="tagName">
        <TabPane label="概览" class="tag-pane">
          <List v-show="tagName === 0">
            <ListItem>
              <span style="color: #f5a623; font-size: 20px; margin-right: 40px;">
                <Icon type="ios-stats" />{{ info.rating?.rank }}
              </span>
              <Rate disabled show-text :model-value="info.rating?.score / 2">
                <span style="color: #f5a623">{{ info.rating?.score }}</span>
              </Rate>
            </ListItem>
            <ListItem>
              <ListItemMeta title="Summary" :description="info.summary"></ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="Tags">
                <template #description>
                  <Tag v-for="row in info.tags" :key="row.index">{{ row.name }}</Tag>
                </template>
              </ListItemMeta>
            </ListItem>
          </List>
        </TabPane>
        <TabPane label="章节" class="tag-pane">
          <List v-show="tagName === 1">
            <ListItem
                v-for="row in episodes"
                :key="row.index"
                style="overflow: auto; width: 100%">
              <ListItemMeta>
                <template #title>
                  <template v-if="row.type === 0">[EP</template>
                  <template v-else-if="row.type === 1">[SP</template>
                  <template v-else-if="row.type === 2">[OP</template>
                  <template v-else-if="row.type === 3">[ED</template>
                  {{ String(row.ep).padStart(2, '0') }}] {{ row.name }}
                </template>
                <template #description>
                  <pre>{{ row.desc }}</pre>
                </template>
              </ListItemMeta>
            </ListItem>
          </List>
        </TabPane>
        <TabPane label="角色" class="tag-pane">
          <Row :gutter="5" v-show="tagName === 2">
            <Col
                :xs="12"
                :sm="12"
                :md="12"
                :lg="8"
                :xl="6"
                :xxl="4"
                v-for="(row, index) in characters"
                :key="index"
            >
              <Card style="text-align: center">
                <template #title>{{ row.relation }}</template>
                <Image
                    :src="row.images.small || 'https://lain.bgm.tv/img/no_icon_subject.png'"
                    fit="fill"
                    preview
                    :preview-list="characters.map(s => s.images.large)"
                    transfer
                    :initial-index="index"
                ></Image><br/><br/>
                <a @click="this.$router.push(`/character/${row.id}`)">{{ row.name }}</a>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="制作人员" class="tag-pane">
          <Row :gutter="5" v-show="tagName === 3">
            <Col
                :xs="8"
                :sm="8"
                :md="6"
                :lg="6"
                :xl="4"
                :xxl="2"
                v-for="(row, index) in persons"
                :key="index"
            >
              <Card>
                <template #title>{{ row.relation }}</template>
                <Image
                    :src="row.images.small || 'https://lain.bgm.tv/img/no_icon_subject.png'"
                    fit="contain"
                    preview
                    :preview-list="persons.map(s => s.images.large)"
                    transfer
                    :initial-index="index"
                ></Image><br/><br/>
                <a @click="this.$router.push(`/person/${row.id}`)">{{ row.name }}</a>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="关联条目" class="tag-pane">
          <Row :gutter="5" v-show="tagName === 4">
            <Col
                :xs="12"
                :sm="12"
                :md="12"
                :lg="8"
                :xl="6"
                :xxl="4"
                v-for="(row, index) in subjects"
                :key="index"
            >
              <Card style="text-align: center">
                <template #title>{{ row.relation }}</template>
                <Image
                    :src="row.images.small || 'https://lain.bgm.tv/img/no_icon_subject.png'"
                    fit="contain"
                    preview
                    :preview-list="subjects.map(s => s.images.large)"
                    transfer
                    :initial-index="index"
                ></Image><br/><br/>
                <a @click="this.$router.push(`/subject/${row.id}`)">{{ row.name }}</a>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Col>
  </Row>

  <Spin fix :show="spinShow">
    <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
    <div>Loading</div>
  </Spin>
</template>

<script>
import {
  Card,
  Text,
  Row,
  Col,
  Image,
  List,
  ListItem,
  ListItemMeta,
  Tag,
  Icon,
  Form,
  FormItem,
  TabPane,
} from "view-ui-plus";
export default {
  name: "SubjectView",
  components: { TabPane, Card, Text, Row, Col, Image, List, ListItem, ListItemMeta, Tag, Icon, Form, FormItem },
  props: ['subjectId'],
  data() {
    return {
      info: {},
      episodes: [],
      characters: [],
      subjects: [],
      persons: [],
      tagName: 0,
      spinShow: false,
    };
  },
  watch: {
    subjectId() {
      this.initData();
    },
  },
  async beforeMount() {
    await this.initData();
  },
  methods: {
    async initData() {
      this.spinShow = true;
      this.info = await this.$common.getSubjectInfo(this.subjectId);
      this.episodes = (await this.$common.getSubjectEpisodes(this.subjectId)).data;
      this.characters = await this.$common.getSubjectCharacters(this.subjectId);
      this.subjects = await this.$common.getSubjectSubjects(this.subjectId);
      this.persons = await this.$common.getSubjectPersons(this.subjectId);
      this.spinShow = false;
    }
  }
}
</script>

<style scoped>
.ivu-list-item:first-of-type {
  padding-top: 0;
}
.tag-pane {
  padding: 0 10px;
}
</style>
<style>
.ivu-list-item-meta-content {
  width: 100%;
}
</style>
