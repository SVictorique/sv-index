import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SubjectView from "@/views/SubjectView.vue";
import CharacterView from "@/views/CharacterView.vue";
import PersonView from "@/views/PersonView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/subject/:subjectId',
      name: 'subject',
      component: SubjectView,
      props: true,
    },
    {
      path: '/character/:characterId',
      name: 'character',
      component: CharacterView,
      props: true,
    },
    {
      path: '/person/:personId',
      name: 'person',
      component: PersonView,
      props: true,
    }
  ]
})

export default router
