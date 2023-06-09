import Anime1Detail from "@/views/Anime1Detail.vue";
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Anime from "@/views/Anime.vue";
import Book from "@/views/Book.vue";
import Music from "@/views/Music.vue";
import Game from "@/views/Game.vue";
import Real from "@/views/Real.vue";
import Subject from "@/components/Subject.vue";
import Character from "@/components/Character.vue";
import Person from "@/components/Person.vue";
import About from "@/views/About.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/anime',
      name: 'anime',
      component: Anime,
    },
    {
      path: '/book',
      name: 'book',
      component: Book,
    },
    {
      path: '/music',
      name: 'music',
      component: Music,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },
    {
      path: '/real',
      name: 'real',
      component: Real,
    },
    {
      path: '/subject/:subjectId',
      name: 'subject',
      component: Subject,
      props: true,
    },
    {
      path: '/character/:characterId',
      name: 'character',
      component: Character,
      props: true,
    },
    {
      path: '/person/:personId',
      name: 'person',
      component: Person,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/anime1/detail',
      name: 'anime1Detail',
      component: Anime1Detail,
    }
  ]
})

export default router
