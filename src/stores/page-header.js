import {defineStore} from "pinia";
import {ref} from "vue";

export const usePageHeader = defineStore('page-header', () => {
  const show = ref(false);
  const title = ref('');

  function set({ show, title }) {
    this.show = show;
    this.title = title;
  }

  return { show, title, set };
});
