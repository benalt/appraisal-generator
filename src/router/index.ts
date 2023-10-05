import { createRouter, createWebHistory } from 'vue-router'
import DocView from '../views/DocView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/appraisal/:id',
      name: 'appraisalDoc',
      component: DocView
    },

  ]
})

export default router
