<template>
  <Card style="width: calc(100% - 20px); margin: 10px auto;">
    <template #title>
      <Text>{{ info.platform }} {{ info.name }}</Text>
      <Text type="secondary">{{ info.name_cn }}</Text>
    </template>
    <Row>
      <Col
          :xs="24"
          :sm="8"
      >
        <Card>
          <Image
              :src="info.images?.common || 'https://lain.bgm.tv/img/no_icon_subject.png'"
              fit="cover"
              :alt="info.name"
              style="width: 100%"
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
      >
        <List style="padding: 0 10px">
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
          <ListItem>
            <ListItemMeta title="Episodes">
              <template #description>
                <Collapse>
                  <Panel
                      v-for="row in episodes"
                      :key="row.index"
                  >
                    <template v-if="row.type === 0">[EP</template>
                    <template v-else-if="row.type === 1">[SP</template>
                    <template v-else-if="row.type === 2">[OP</template>
                    <template v-else-if="row.type === 3">[ED</template>
                    {{ String(row.ep+1).padStart(2, '0') }}] {{ row.name }}
                    <template #content><pre>{{ row.desc }}</pre></template>
                  </Panel>
                </Collapse>
              </template>
            </ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta title="Characters">
              <template #description>
                <Card
                    v-for="row in characters"
                    :key="row.index"
                    class="ivu-fl"
                    style="margin: 5px"
                >
                  <template #title>{{ row.relation }}</template>
                  <Image
                      :src="row.images.small || 'https://lain.bgm.tv/img/no_icon_subject.png'"
                      fit="contain"
                      style="width: 100px; height: 100px;"
                  ></Image><br/>
                  <Text type="secondary" v-line-clamp="1" style="width: 100px;">{{ row.name }}</Text>
                </Card>
              </template>
            </ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta title="Persons">
              <template #description>
                <Card
                    v-for="row in persons"
                    :key="row.index"
                    class="ivu-fl"
                    style="margin: 5px"
                >
                  <template #title>{{ row.relation }}</template>
                  <Image
                      :src="row.images.small || 'https://lain.bgm.tv/img/no_icon_subject.png'"
                      fit="contain"
                      style="width: 100px; height: 100px;"
                  ></Image><br/>
                  <Text type="secondary" v-line-clamp="1" style="width: 100px;">{{ row.name }}</Text>
                </Card>
              </template>
            </ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemMeta title="Subjects">
              <template #description>
                <Card
                    v-for="row in subjects"
                    :key="row.index"
                    class="ivu-fl"
                    style="margin: 5px"
                >
                  <template #title>{{ row.relation }}</template>
                  <Image
                      :src="row.images.small || 'https://lain.bgm.tv/img/no_icon_subject.png'"
                      fit="contain"
                      style="width: 100px; height: 100px;"
                  ></Image><br/>
                  <Text type="secondary" v-line-clamp="1" style="width: 100px;">{{ row.name }}</Text>
                </Card>
              </template>
            </ListItemMeta>
          </ListItem>
        </List>
      </Col>
    </Row>
  </Card>
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
  Collapse,
  Panel,
} from "view-ui-plus";
export default {
  name: "SubjectView",
  components: {
    Panel,
    Collapse, Card, Text, Row, Col, Image, List, ListItem, ListItemMeta, Tag, Icon, Form, FormItem },
  props: ['subjectId'],
  data() {
    return {
      info: {},
      episodes: [],
      characters: [],
      subjects: [],
      persons: [],
    };
  },
  async beforeMount() {
    this.info = await this.$common.getSubjectInfo(this.subjectId);
    this.episodes = (await fetch(`https://api.bgm.tv/v0/episodes?subject_id=${this.subjectId}`)
        .then((res) => res.json())).data;
    this.characters = await fetch(`https://api.bgm.tv/v0/subjects/${this.subjectId}/characters`)
        .then((res) => res.json());
    this.subjects = await fetch(`https://api.bgm.tv/v0/subjects/${this.subjectId}/subjects`)
        .then((res) => res.json());
    this.persons = await fetch(`https://api.bgm.tv/v0/subjects/${this.subjectId}/persons`)
        .then((res) => res.json());
  }
}
</script>

<style scoped>
.ivu-list-item:first-of-type {
  padding-top: 0;
}
</style>
