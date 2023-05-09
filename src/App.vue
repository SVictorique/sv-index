<template>
  <Layout :style="{ height: '100vh' }">
    <Header>
      <div class="layout-logo">
        <Image :src="`${baseUrl}/logo.svg`" :height="58"></Image>
      </div>
      <h1 class="layout-title">银小维 Anime</h1>
      <Avatar
          icon="logo-github"
          style="background-color: #000; color: #fff; margin-left: 12px; cursor: pointer"
          @click="openGithub"
      />
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
    };
  },
  methods: {
    openGithub() {
      window.open('https://github.com/SVictorique/sv-anime')
    },
  },
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
