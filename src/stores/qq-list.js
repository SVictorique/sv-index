import {defineStore} from "pinia";
import {ref} from "vue";

export const useQQList = defineStore('qq-list', () => {
  const channelId = ref(100113);
  const sort = ref(79)

  function set({channelId, sort}) {
    this.channelId = channelId;
    this.sort = sort;
  }

  return { channelId, sort, set };
});
