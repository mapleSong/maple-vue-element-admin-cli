import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routers: [],
    addRouters: [],
    cachedRouters: []
}
const mutations = {
    SET_ROUTERS: (state, routers) => {
        state.addRouters = routers
        state.routers = constantRouterMap.concat(routers)
    },
    ADD_CACHED_ROUTER: (state, router) => {
        if (state.cachedRouters.includes(router.name)) return
        if (!router.meta.noCache) {
            state.cachedRouters.push(router.name)
        }
    }
}
const actions = {
    GenerateRoutes({ commit }, data) {
        return new Promise(async resolve => {
            // const { roles } = data
            // let accessedRouters
            // if (roles.includes('admin')) {
            //     accessedRouters = asyncRouterMap
            // } else {
            //     accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            // }
            let accessedRouters = asyncRouterMap
            commit('SET_ROUTERS', accessedRouters)
            resolve()
        })
    },
    addCacheRouter({ commit }, router) {
        commit('ADD_CACHED_ROUTER', router)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}