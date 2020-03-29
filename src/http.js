import Vue from 'vue'
import axios from 'axios'
import router from './router'
import { Message } from 'element-ui'
import { getToken } from './utils/auth'

const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
})


// 发起请求
http.interceptors.request.use(function(config) {
    const token = getToken()
    if (token) {
        config.headers['token'] = token
    }
    return config;
}, function(error) {
    console.log(error) // for debug
    return Promise.reject(error)
})



// 响应请求
http.interceptors.response.use(response => {
    const res = response.data.head

    // if the custom status is not 0, it is judged as an error.
    if (res.status !== 0) {
        const { code, description } = res.error
        
        if (code === 500001) {
            // to re-login
            Message({
                message: '验证错误',
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            Message({
                message: code + ' => ' + description || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
        }
        return Promise.reject(new Error(code + '=>' + description || 'Error'))
    } else {
        return response.data.body
    }
}, err => {
    console.log('err-code:', err.response.status)
    Message({
        type: 'error',
        message: '服务错误=>' + err.response.status
    })
    return Promise.reject(err)
})


export default http