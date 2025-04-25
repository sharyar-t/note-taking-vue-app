import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'

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
      component: AppLayout,
      children: [
        {
          name: 'AllNotes',
          path: 'all-notes',
          component: () => import('@/views/notes/AllNotes.vue'),
        },
        {
          name: 'ArchivedNotes',
          path: 'archived-notes',
          component: () => import('@/views/notes/ArchivedNotes.vue'),
        },
      ],
    },
  ],
})

export default router
