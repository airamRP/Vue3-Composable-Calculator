import { createRouter, createWebHistory } from 'vue-router'
// import Standard from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Standard',
    // component: Standard
    component: () => import('@/views/Standard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
