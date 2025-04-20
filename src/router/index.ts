import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'SignIn',
          path: 'sign-in',
          component: () => import('@/views/auth/SignInView.vue'),
        },
        {
          name: 'SignUp',
          path: 'sign-up',
          component: () => import('@/views/auth/SignUpView.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
  ],
})

export default router
