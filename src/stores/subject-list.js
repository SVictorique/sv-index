import {defineStore} from "pinia";
import {ref} from "vue";

export const useSubjectList = defineStore('subject-list', () => {
  const type = ref(2);

  function set({type}) {
    this.type = type;
  }

  return { type, set };
});
