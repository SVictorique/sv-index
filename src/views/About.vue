<template>
  <Row style="padding-top: 24px;">
    <Col :span="16" :offset="4">
      <Card title="关于 银小维 Anime">
        <Typography>
          <Title :level="3">简介</Title>
          <Paragraph>
            本网站主要基于番组计划数据，展示二次元文化（动画、书籍、音乐、游戏、三次元）相关信息，便于获取二次元相关信息。<br/>
            网站为纯前端项目，不记录任何使用者信息，所有数据存储基于localStorage和sessionStorage。<br/>
            本网站为本人个人开发项目，欢迎使用者提供建议（<Link target="_blank" style="display: inline" to="https://github.com/SVictorique">github</Link>或<Link target="_blank" style="display: inline" to="https://twitter.com/sv_yunfeng">twitter</Link>）
          </Paragraph>
          <Title :level="3">声明</Title>
          <Paragraph>
            <ul>
              <li><Text strong>网站数据都来自第三方，不保证数据的正确性和完整性</Text></li>
              <li><Text strong>本网站仅供个人和学习使用，禁止被用作商业用途</Text></li>
            </ul>
          </Paragraph>
          <Title :level="3">数据来源</Title>
          <Paragraph>
            <ul>
              <li><Link target="_blank" to="https://bgm.tv/">番组计划</Link></li>
              <li><Link target="_blank" to="https://github.com/bangumi-data/bangumi-data">Bangumi Data</Link></li>
            </ul>
          </Paragraph>
          <Title :level="3">技术支持</Title>
          <Paragraph>
            <ul>
              <li><Link target="_blank" to="https://cn.vuejs.org/">Vue.js</Link></li>
              <li><Link target="_blank" to="https://router.vuejs.org/zh/">Vue Router</Link></li>
              <li><Link target="_blank" to="https://pinia.vuejs.org/zh/">Pinia</Link></li>
              <li><Link target="_blank" to="https://www.iviewui.com/">View Design</Link></li>
              <li><Link target="_blank" to="https://github.com/">github</Link></li>
            </ul>
          </Paragraph>
        </Typography>
      </Card>
    </Col>
  </Row>
</template>

<script>
import {Link, Paragraph, Title} from "view-ui-plus";
export default {
  name: "AboutView",
  components: {Link, Paragraph, Title}
}
</script>

<style scoped>

</style>
