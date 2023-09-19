<template>
  <Layout :style="{ height: '100vh' }">
    <Header>
      <Menu mode="horizontal" theme="dark" style="height: 64px; display: flex; z-index: 900">
        <div class="layout-logo" @click="this.$router.push(`/`)" style="cursor: pointer">
          <Image :src="`${baseUrl}/logo.svg`" :height="32" style="margin: 12px 0"></Image>
          <h2 class="layout-title" @click="this.$router.push(`/`)" style="cursor: pointer">银小维 Index</h2>
        </div>
        <div class="layout-dropdown">
          <Dropdown trigger="click">
            <Button type="default">菜单</Button>
            <template #list>
              <DropdownMenu>
                <DropdownItem @click="$router.push('/anime')">动画</DropdownItem>
                <DropdownItem @click="$router.push('/book')">书籍</DropdownItem>
                <DropdownItem @click="$router.push('/music')">音乐</DropdownItem>
                <DropdownItem @click="$router.push('/game')">游戏</DropdownItem>
                <DropdownItem @click="$router.push('/real')">三次元</DropdownItem>
                <DropdownItem @click="$router.push('/movie')">电影</DropdownItem>
                <DropdownItem @click="$router.push('/teleplay')">电视剧</DropdownItem>
                <DropdownItem @click="$router.push('/about')">关于</DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
        </div>
        <div class="layout-nav">
          <MenuItem name="anime" to="/anime">动画</MenuItem>
          <MenuItem name="book" to="/book">书籍</MenuItem>
          <MenuItem name="music" to="/music">音乐</MenuItem>
          <MenuItem name="game" to="/game">游戏</MenuItem>
          <MenuItem name="real" to="/real">三次元</MenuItem>
          <MenuItem name="movie" to="/movie">电影</MenuItem>
          <MenuItem name="teleplay" to="/teleplay">电视剧</MenuItem>
          <MenuItem name="about" to="/about">关于</MenuItem>
        </div>
      </Menu>
    </Header>
    <PageHeader v-show="pageHeader.show" :title="pageHeader.title" back hidden-breadcrumb @on-back="this.$router.go(-1)"></PageHeader>
    <Content :style="{ height: 'calc(100vh - 64px)', overflow: 'auto' }">
      <RouterView/>
      <GlobalFooter :links="links" :copyright="copyright" class="footer"/>
    </Content>
  </Layout>
</template>

<script>
import {Button, Dropdown, DropdownItem, DropdownMenu, GlobalFooter, Menu, MenuItem} from "view-ui-plus";
import {usePageHeader} from "@/stores/page-header";
export default {
  name: 'App',
  components: {GlobalFooter, DropdownItem, DropdownMenu, Button, Dropdown, MenuItem, Menu},
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
      pageHeader: usePageHeader(),
      links: [{
        href: 'https://github.com/SVictorique/sv-anime',
        blankTarget: true,
        icon: 'logo-github',
      }, {
        href: 'https://twitter.com/sv_yunfeng',
        blankTarget: true,
        icon: 'logo-twitter'
      }, {
        href: `${import.meta.env.BASE_URL}#/about`,
        blankTarget: false,
        icon: 'ios-information-circle',
      }],
      copyright: 'Copyright © 2023 银小维 All Rights Reserved',
    };
  },
}
</script>

<style scoped>
.layout-logo {
  display: flex;
  flex-direction: row;
  width: 180px;
  height: 100%;
  border-radius: 16px;
  float: left;
  position: relative;
  top: 0;
  left: 0;
  padding: 4px;
  /*background-color: #000000;*/
  line-height: 56px;
}
.layout-title {
  display: flex;
  height: 100%;
  margin-left: 8px;
  line-height: 56px;
  color: #ffffff;
}
.layout-nav {
  width: calc(100% - 180px);
  height: 100%;
  flex-wrap: wrap;
}
.layout-nav a {
  width: auto;
  line-height: 64px;
}
.layout-dropdown {
  margin-left: 8px;
}
@media screen and (min-width: 768px) {
  .layout-nav {
    display: flex;
  }
  .layout-dropdown {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .layout-nav {
    display: none;
  }
  .layout-dropdown {
    display: flex;
  }
}
</style>
<style>
.footer .ivu-global-footer-links a {
  width: auto;
  display: inline-block;
}
.ivu-image-error{
  position: relative;
}
</style>
