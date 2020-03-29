import { login } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { setUserName, getUserName, removeUserName } from '@/utils/user'
import { resetRouter } from '@/router'


const state = {
    token: getToken(),
    username: getUserName(),
    roles: []
}
const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_ROLES(state, roles) {
        state.roles = roles
    },
    SET_USERNAME(state, username) {
        state.username = username
    }
}
const actions = {
    // 登录 => 设置token 用户基础信息
    login({ commit }, loginInfo) {
        return new Promise((resolve, reject) => {
            // login(loginInfo).then(res => {
            const res = { token: 123 }
            setToken(res.token)
            setUserName(loginInfo.username)
            commit('SET_TOKEN', res.token)
            commit('SET_USERNAME', loginInfo.username)

            resolve()
            // }).catch(err => {
            //     reject()
            // })
        })
    },
    // 获取用户信息
    getUserInfo({ commit }) {
        return new Promise(async (resolve, reject) => {
            commit('SET_ROLES', ['admin'])
            resolve()
        })
    },

    // 登出
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_USERNAME', '')
            removeToken()
            resetRouter()
            removeUserName()

            resolve()
        })
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}