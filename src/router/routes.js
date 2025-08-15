const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/cards', component: () => import('pages/CardsPage.vue') },
      { path: '/planner', component: () => import('components/planner/AppPlanner.vue') },
      { path: '/inbox', component: () => import('components/inbox/AppInbox.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
