import { createRouter, createWebHistory, type Router } from 'vue-router'
import store from '@/store'
import { isEmpty } from 'lodash'
import { getData } from '@/apis/spreadsheet'
import { tableToJson } from '@/utils/table-to-json'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/index.vue')
    },
    {
      path: '/main/:member',
      name: 'main',
      component: () => import('@/views/main/index.vue'),
      meta: {
        needAuth: true
      },
      children: [
        {
          path: 'programmes',
          name: 'programme-list',
          component: () => import('@/views/programme-list/index.vue'),
          meta: {
            needAuth: true
          }
        },
        {
          path: 'member-list',
          name: 'member-list',
          component: () => import('@/views/member-list/index.vue'),
          meta: {
            needAuth: true
          }
        },
        {
          path: 'qr',
          name: 'qr-code',
          component: () => import('@/views/qr-code/index.vue'),
          meta: {
            needAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = store.getters.getToken
  const userName = to.params.member

  if (to.meta.needAuth == true) {
    if (!isEmpty(token)) {
      const response = await getData('Members')
      const parsedMembers = tableToJson(response.table.cols, response.table.rows)

      const currentUser = parsedMembers.filter((e: any) => e.Name === userName)

      if (currentUser.length > 0 && currentUser[0].Token === token) {
        next()
        return
      }
    }

    store.dispatch('logout')
    next({
      name: 'index'
    })
    return
  }

  next()
})

export default router
