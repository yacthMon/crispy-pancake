import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import QuestionList from '../components/QuestionList.vue'
import AnswerComponent from '../components/AnswerComponent.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'QuestionList',
    component: QuestionList
  },
  {
    path: '/answer',
    name: 'Answer',
    component: AnswerComponent
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
