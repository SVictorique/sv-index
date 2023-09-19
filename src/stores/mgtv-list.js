import {defineStore} from "pinia";
import {ref} from "vue";

export const useMgtvList = defineStore('mgtv-list', () => {
  const channelId = ref(2);

  function set({channelId}) {
    this.channelId = channelId;
  }

  return { channelId, set };
});
