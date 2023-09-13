<template>
  <SubjectList></SubjectList>
</template>

<script>
import SubjectList from "@/components/SubjectList.vue";
import {usePageHeader} from "@/stores/page-header";
import {useSubjectList} from "@/stores/subject-list";

export default {
  name: "BookView",
  components: {SubjectList},
  created() {
    usePageHeader().set({
      show: true,
      title: '书籍',
    });
    useSubjectList().set({
      type: 1,
    });
  }
}
</script>

<style scoped>

</style>
