import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout/index'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */


export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
        title: '登录'
    },
}]

export const asyncRouterMap = [{
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/index'),
            meta: {
                title: '首页',
                icon: 'dashboard',
                noCache: true
            }
        }]
    },
    {
        path: '/guide',
        component: Layout,
        redirect: 'index',
        children: [{
            path: 'index',
            name: 'guide',
            component: () => import('@/views/guide/index'),
            meta: {
                title: '指南',
                icon: 'guide',
            }
        }]
    }
]


const createRouter = () => new Router({
    mode: 'hash',
    base: process.env.VUE_APP_ROUTER_BASE,
    routes: constantRouterMap,
    scrollBehavior: () => ({ y: 0 }), //解决路由跳转后scrollTop
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}


export default router