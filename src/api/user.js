import http from '@/http';
import Qs from 'qs'

const base = 'user'

export function login(data) {
    return http({
        url: base + '/login',
        method: 'POST',
        data: Qs.stringify(data)
    })
}