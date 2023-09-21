import {defineStore} from "pinia";
import {ref} from "vue";

export const useYoukuList = defineStore('youku-list', () => {
  const type = ref('teleplay');

  function set({type}) {
    this.type = type;
  }

  return { type, set };
});
