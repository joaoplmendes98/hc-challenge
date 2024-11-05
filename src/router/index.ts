import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '@/views/UsersView.vue'
import UserOrdersView from '@/views/UserOrdersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      component: UsersView
    },
    {
      path: '/:id/orders',
      name: 'user-orders',
      component: UserOrdersView
    }
  ]
})

export default router
