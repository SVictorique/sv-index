import { reactive } from 'vue';

const bgmApiRoot = 'https://api.bgm.tv';

const getCacheData = async (key, id, url) => {
  if (!sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, JSON.stringify({}));
  }
  const history = JSON.parse(sessionStorage.getItem(key));

  let info;
  if (history[id]) {
    info = history[id];
  } else {
    try {
      info = await fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.status);
            }
            return res;
          })
          .then((res) => res.json());

      history[id] = info;
      sessionStorage.setItem(key, JSON.stringify(history));
    } catch (e) { /* empty */
    }
  }

  return info;
};

export const common = reactive({
  bgmApiRoot,
  async getSubjectInfo(id) {
    return getCacheData('sv-anime-subject', id, `${bgmApiRoot}/v0/subjects/${id}`);
  },
  async getSubjectEpisodes(id) {
    return getCacheData('sv-anime-subject-episodes', id, `${bgmApiRoot}/v0/episodes?subject_id=${id}`);
  },
  async getSubjectCharacters(id) {
    return getCacheData('sv-anime-subject-characters', id, `${bgmApiRoot}/v0/subjects/${id}/characters`);
  },
  async getSubjectPersons(id) {
    return getCacheData('sv-anime-subject-persons', id, `${bgmApiRoot}/v0/subjects/${id}/persons`);
  },
  async getSubjectSubjects(id) {
    return getCacheData('sv-anime-subject-subjects', id, `${bgmApiRoot}/v0/subjects/${id}/subjects`);
  },

  async getCharacterInfo(id) {
    return getCacheData('sv-anime-character', id, `${bgmApiRoot}/v0/characters/${id}`);
  },
  async getCharacterPersons(id) {
    return getCacheData('sv-anime-character-persons', id, `${bgmApiRoot}/v0/characters/${id}/persons`);
  },
  async getCharacterSubjects(id) {
    return getCacheData('sv-anime-character-subjects', id, `${bgmApiRoot}/v0/characters/${id}/subjects`);
  },

  async getPersonInfo(id) {
    return getCacheData('sv-anime-person', id, `${bgmApiRoot}/v0/persons/${id}`);
  },
  async getPersonCharacter(id) {
    return getCacheData('sv-anime-person-characters', id, `${bgmApiRoot}/v0/persons/${id}/characters`);
  },
  async getPersonSubjects(id) {
    return getCacheData('sv-anime-person-subjects', id, `${bgmApiRoot}/v0/persons/${id}/subjects`);
  },
  async getCalendar() {
    return getCacheData('sv-anime-calendar', 'default', `${bgmApiRoot}/calendar`);
  },
  getCurSeason() {
    const date = new Date();
    let month;
    if (date.getMonth() < 4) {
      month = '01';
    } else if (date.getMonth() < 7) {
      month = '04';
    } else if (date.getMonth() < 10) {
      month = '07';
    } else {
      month = '10';
    }
    return `${date.getFullYear()}-${month}-01`;
  }
});
