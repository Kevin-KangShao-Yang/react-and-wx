const KEY = 'HKZF-TOKEN'

export const setToken = token => {
    window.localStorage.setItem(KEY,token)
}

const getToken = () => {
    return window.localStorage.getItem(KEY)
}

export const isAuth = () => {
    return getToken()
}