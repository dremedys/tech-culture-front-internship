import {format, parseISO} from "date-fns";

export function formatFromISO(ISODate:string){
    return format(parseISO(ISODate), "yyyy.MM.dd' 'HH:mm")
}

export function setAccessTokenToStorage(token: string) {
    localStorage.setItem('token', token);
}

export function setRefreshTokenToStorage(token: string){
    localStorage.setItem('refreshToken', token);
}

export function removeTokensFromStorage() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user_id')
}
