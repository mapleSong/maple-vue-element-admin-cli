import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout/index'




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
            icon: 'documentation'
        }
    }]
}]


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