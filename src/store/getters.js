const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    username : state => state.user.username,
    roles : state => state.user.roles,
    addRouters: state => state.permission.addRouters,
    permission_routers: state => state.permission.routers,
    cacheRouters: state => state.permission.cachedRouters
}


export default getters