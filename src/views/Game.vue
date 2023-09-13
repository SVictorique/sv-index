<template>
  <SubjectList></SubjectList>
</template>

<script>
import SubjectList from "@/components/SubjectList.vue";
import {usePageHeader} from "@/stores/page-header";
import {useSubjectList} from "@/stores/subject-list";

export default {
  name: "GameView",
  components: {SubjectList},
  created() {
    usePageHeader().set({
      show: true,
      title: '游戏',
    });
    useSubjectList().set({
      type: 4,
    });
  }
}
</script>

<style scoped>

</style>
