import { reactive } from 'vue';

export const common = reactive({
  async getSubjectInfo(subjectId) {
    const subjectKey = 'sv-anime-subject';
    if (!localStorage.getItem(subjectKey)) {
      localStorage.setItem(subjectKey, JSON.stringify({}));
    }
    const subjectHis = JSON.parse(localStorage.getItem(subjectKey));

    let info;
    if (subjectHis[subjectId]) {
      info = subjectHis[subjectId];
    } else {
      try {
        info = await fetch(`https://api.bgm.tv/v0/subjects/${subjectId}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.status);
            }
            return res;
          })
          .then((res) => res.json());

        subjectHis[subjectId] = info;
        localStorage.setItem(subjectKey, JSON.stringify(subjectHis));
      } catch (e) { /* empty */
      }
    }

    return info;
  },
});
