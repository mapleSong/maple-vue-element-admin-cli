import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import { getToken } from './utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] //白名单


router.beforeEach(async (to, from, next) => {
    NProgress.start() // start progress bar
    if (getToken()) {
        if (to.path === '/login') {
            next('/')
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            if (store.getters.roles.length === 0) { //判断是拉取完成用户权限
                await store.dispatch("user/getUserInfo") // 拉取user_info 设置roles
                await store.dispatch('permission/GenerateRoutes') // 根据roles权限生成可访问的路由表
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
        }
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    }
})


router.afterEach(() => {
    NProgress.done() // finish progress bar
})