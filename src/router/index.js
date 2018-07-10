import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('../views/info/Login.vue').then(m => m.default);
const Home = () => import('../views/home/Home.vue').then(m => m.default);
const ResetPassword = () => import('../views/info/ResetPassword.vue').then(m => m.default);
const UploadMedia = () => import('../views/media/UploadMedia.vue').then(m => m.default);
const MediaList = () => import('../views/media/MediaList.vue').then(m => m.default);


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/resetPsw',
      name: 'resetPsw',
      component: ResetPassword
    },
    {
      path: '/uploadMedia',
      name: 'uploadMedia',
      component: UploadMedia
    },
    {
      path: '/mediaList',
      name: 'mediaList',
      component: MediaList
    }

  ]
})
