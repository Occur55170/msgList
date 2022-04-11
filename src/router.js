import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ArticleList',
      component: () => import('./views/ArticleList.vue')
      // children:[
      //   {
      //     path: 'articleCon',
      //     name: 'articleCon',
      //     component: () => import('./views/articleCon.vue')
      //   },
      //   {
      //     path: 'userInfo',
      //     name: 'userInfo',
      //     component: () => import('./views/userInfo.vue')
      //   },
      // ]
    },
    {
      path: '/ArticleCon/:id',
      name: 'ArticleCon',
      component: () => import('./views/ArticleCon.vue')
    }

  ]
})
