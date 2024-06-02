import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: import('../layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: import('../views/HomeView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/profile',
          name: 'profile',
          component: import('../views/ProfileView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/deposit',
          name: 'deposit',
          component: import('../views/DepositView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/withdraw',
          name: 'withdraw',
          component: import('../views/WithdrawView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: import('../views/RegisterView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: import('../views/PageNotFoundView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const token = localStorage.getItem('accessToken')

  if (requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
