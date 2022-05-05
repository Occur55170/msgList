import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
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
      // ]
    },
    {
      path: '/ArticleCon/:id',
      name: 'ArticleCon',
      component: () => import('./views/ArticleCon.vue')
    },
    {
      path: '/MemberInfo/:id',
      name: 'MemberInfo',
      component: () => import('./views/MemberInfo.vue')
    }

  ]
})
