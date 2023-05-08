<template>
  <Layout :style="{ height: '100vh' }">
    <Header>
      <div class="layout-logo">
        <Image :src="`${baseUrl}/logo.svg`" :height="58"></Image>
      </div>
      <h1 class="layout-title">银小维 Anime</h1>
      <Input v-model="search" placeholder="Search" class="ivu-fr" style="width: 200px">
        <template #suffix>
          <Icon type="ios-search" />
        </template>
      </Input>
    </Header>
    <Content :style="{ height: 'calc(100vh - 64px)', overflow: 'auto' }"><RouterView/></Content>
  </Layout>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
      search: '',
    };
  },
  watch: {
    search(s) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, { search: s })
      });
    },
  },
  beforeMount() {
    this.search = this.$route.query.search;
  }
}
</script>

<style scoped>
.layout-logo{
  width: 64px;
  height: 64px;
  border-radius: 16px;
  float: left;
  position: relative;
  top: 0;
  left: 0;
  padding: 2px;
  /*background-color: #000000;*/
  line-height: 58px;
}
.layout-title {
  float:left;
  margin-left: 24px;
  line-height: 64px;
  color: #ffffff;
}
</style>
