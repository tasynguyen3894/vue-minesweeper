import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/z',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/',
      name: 'start-page',
      component: require('@/components/StartGame').default
    },
    {
      path: '/run-game',
      name: 'run-game',
      component: require('@/components/RunGame').default
    },
    {
      path: '/save-list',
      name: 'save-list',
      component: require('@/components/SaveList').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
