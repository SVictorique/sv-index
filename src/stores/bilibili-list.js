import {defineStore} from "pinia";
import {ref} from "vue";

export const useBilibiliList = defineStore('bilibili-list', () => {
  const type = ref('anime');

  function set({type}) {
    this.type = type;
  }

  return { type, set };
});
