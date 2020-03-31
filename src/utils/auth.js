import Cookies from 'js-cookie'

const TokenKey = 'Admin_Token'


var inFifteenMinutes = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); //Cookie过期时间

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, {
        expires: inFifteenMinutes
    })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}