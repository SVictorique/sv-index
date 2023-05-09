<template>
  <PageHeader back hidden-breadcrumb @on-back="this.$router.go(-1)">
    <template #title>
      <Text>{{ info.name }}</Text>
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
            :src="info.images?.medium || 'https://lain.bgm.tv/img/no_icon_subject.png'"
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
      <List>
        <ListItem>
          <ListItemMeta title="简介" :description="info.summary"></ListItemMeta>
        </ListItem>
        <ListItem>
          <ListItemMeta title="出演">
            <template #description>
              <Row :gutter="24">
                <Col
                    v-for="(row, index) in persons"
                    :key="index"
                    :xs="24"
                    :sm="24"
                    :md="12"
                    :xl="8"
                    :xxl="6"
                    style="padding: 10px;"
                >
                  <Row>
                    <Col :span="5">
                      <Image
                          :src="row.subjectImage || 'https://lain.bgm.tv/img/no_icon_subject.png'"
                          fit="contain"
                          style="width: 100%"
                      ></Image>
                    </Col>
                    <Col
                        :span="14"
                        style="padding: 0 10px"
                    >
                      <Text><a @click="this.$router.push(`/subject/${row.subject_id}`)">{{ row.subject_name }}</a></Text>
                      <Text type="secondary">{{ row.subject_name_cn }}</Text><br/>
                      <Text type="success">{{ row.staff }}</Text>
                    </Col>
                    <Col :span="5">
                      <Image
                          :src="row.personImage || 'https://lain.bgm.tv/img/no_icon_subject.png'"
                          fit="contain"
                          style="width: 100%"
                      ></Image>
                      <a @click="this.$router.push(`/person/${row.id}`)">CV: {{ row.name }}</a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </template>
          </ListItemMeta>
        </ListItem>
        <ListItem>
          <ListItemMeta title="关联条目">
            <template #description>
              <Row :gutter="5">
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
                    <template #title>{{ row.staff }}</template>
                    <Image
                        :src="row.image || 'https://lain.bgm.tv/img/no_icon_subject.png'"
                        fit="contain"
                        preview
                        :preview-list="subjects.map(s => s.image)"
                        transfer
                        :initial-index="index"
                    ></Image><br/><br/>
                    <a @click="this.$router.push(`/subject/${row.id}`)">{{ row.name }}</a>
                  </Card>
                </Col>
              </Row>
            </template>
          </ListItemMeta>
        </ListItem>
      </List>
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
  name: "CharacterView",
  components: { TabPane, Card, Text, Row, Col, Image, List, ListItem, ListItemMeta, Tag, Icon, Form, FormItem },
  props: ['characterId'],
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

      this.info = await this.$common.getCharacterInfo(this.characterId);
      this.subjects = await this.$common.getCharacterSubjects(this.characterId);
      this.persons = await this.$common.getCharacterPersons(this.characterId);

      this.spinShow = false;

      for (const per of this.persons) {
        per.subjectImage = (await this.$common.getSubjectInfo(per.subject_id)).images.medium;
        per.personImage = (await this.$common.getPersonInfo(per.id)).images.medium;
      }
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
