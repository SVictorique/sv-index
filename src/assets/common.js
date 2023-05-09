import { reactive } from 'vue';

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
  async getSubjectInfo(id) {
    return getCacheData('sv-anime-subject', id, `https://api.bgm.tv/v0/subjects/${id}`);
  },
  async getSubjectEpisodes(id) {
    return getCacheData('sv-anime-subject-episodes', id, `https://api.bgm.tv/v0/episodes?subject_id=${id}`);
  },
  async getSubjectCharacters(id) {
    return getCacheData('sv-anime-subject-characters', id, `https://api.bgm.tv/v0/subjects/${id}/characters`);
  },
  async getSubjectPersons(id) {
    return getCacheData('sv-anime-subject-persons', id, `https://api.bgm.tv/v0/subjects/${id}/persons`);
  },
  async getSubjectSubjects(id) {
    return getCacheData('sv-anime-subject-subjects', id, `https://api.bgm.tv/v0/subjects/${id}/subjects`);
  },

  async getCharacterInfo(id) {
    return getCacheData('sv-anime-character', id, `https://api.bgm.tv/v0/characters/${id}`);
  },
  async getCharacterPersons(id) {
    return getCacheData('sv-anime-character-persons', id, `https://api.bgm.tv/v0/characters/${id}/persons`);
  },
  async getCharacterSubjects(id) {
    return getCacheData('sv-anime-character-subjects', id, `https://api.bgm.tv/v0/characters/${id}/subjects`);
  },

  async getPersonInfo(id) {
    return getCacheData('sv-anime-person', id, `https://api.bgm.tv/v0/persons/${id}`);
  },
  async getPersonCharacter(id) {
    return getCacheData('sv-anime-person-characters', id, `https://api.bgm.tv/v0/persons/${id}/characters`);
  },
  async getPersonSubjects(id) {
    return getCacheData('sv-anime-person-subjects', id, `https://api.bgm.tv/v0/persons/${id}/subjects`);
  },
});
