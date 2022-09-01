import {GetRequestParams} from "../Models/IRequestParams";

export const ParseGetRequestURL = (url: URL):GetRequestParams => {

    const eventName = GetNameFromRoute(url)
    // toto je hnus :(
    const from: number = isValidNumber(isNotNull(url.searchParams.get('from')))
    const to: number = isValidNumber(isNotNull(url.searchParams.get('to')))
    const interval: number = isValidNumber(isNotNull(url.searchParams.get('interval')))
    return {queryParams: {from, to, interval}, eventName}
}

export const GetNameFromRoute = (url: URL): string => {
    const route = url.pathname
    const splitRoute = route.split("/")
    return splitRoute[1]
}

const isNotNull = (param: string | null): string => {
    if (param == null) {
        throw("cant be null")
    }
    return param
}

const isValidNumber = (param: string): number => {
    try {
        return Number(param)
    } catch (e) {
        throw (`Error converting string to number: ${e}`)
    }
}


