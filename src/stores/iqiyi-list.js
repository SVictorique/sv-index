import {defineStore} from "pinia";
import {ref} from "vue";

export const useIqiyiList = defineStore('iqiyi-list', () => {
  const channelId = ref(1);

  function set({channelId}) {
    this.channelId = channelId;
  }

  return { channelId, set };
});
