<template>
  <SubjectList></SubjectList>
</template>

<script>
import SubjectList from "@/components/SubjectList.vue";
import {usePageHeader} from "@/stores/page-header";
import {useSubjectList} from "@/stores/subject-list";

export default {
  name: "RealView",
  components: {SubjectList},
  created() {
    usePageHeader().set({
      show: true,
      title: '三次元',
    });
    useSubjectList().set({
      type: 6,
    });
  }
}
</script>

<style scoped>

</style>
