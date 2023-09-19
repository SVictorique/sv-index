import {defineStore} from "pinia";
import {ref} from "vue";

export const usePoxiaoList = defineStore('poxiao-list', () => {
  const type = ref('anime');

  function set({type}) {
    this.type = type;
  }

  return { type, set };
});
