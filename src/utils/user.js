import Cookies from 'js-cookie'

const NickName = 'Nick_Name'


export function getUserName() {
    return Cookies.get(NickName)
}

export function setUserName(nickname) {
    return Cookies.set(NickName, nickname)
}

export function removeUserName() {
    return Cookies.remove(NickName)
}