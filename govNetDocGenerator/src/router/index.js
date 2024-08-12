import { createRouter, createWebHistory } from 'vue-router'
import DataUpload from '../views/DataUpload.vue'
// import GeneratedFiles from '../views/GeneratedFromHtml.vue'
import UploadedData from '../views/UploadedData.vue'
import HomeView from '../views/HomeView.vue'
import GeneratedFromHtml from '../views/GeneratedFromHtml.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'data-upload',
      component:  DataUpload
    },
    {
      path: '/generated-files',
      name: 'generated-files',
      component: GeneratedFromHtml
    },
    {
      path: '/uploaded-data',
      name: 'uploaded-data',
      component: UploadedData
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/DataUpload.vue')
    }
  ]
})

export default router


