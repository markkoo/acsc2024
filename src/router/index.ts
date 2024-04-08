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
          path: 'dress-code',
          name: 'dress-code',
          component: () => import('@/views/dress-code/index.vue'),
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
        },
        {
          path: 'programmes/:programmeId',
          name: 'programme-detail',
          component: () => import('@/views/programme-detail/index.vue'),
          meta: {
            needAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const user = store.getters.getUser
  const token = store.getters.getToken

  if (to.meta.needAuth == true) {
    if (!isEmpty(user) && !isEmpty(token)) {
      const response = await getData('Members')
      const parsedMembers = tableToJson(response.table.cols, response.table.rows)

      const currentUser = parsedMembers.filter((e: any) => e.id === user.id)

      if (currentUser.length > 0 && currentUser[0].Token === token) {
        next()
        return
      }
    }

    next({
      name: 'index'
    })
    return
  }

  next()
})

export default router
