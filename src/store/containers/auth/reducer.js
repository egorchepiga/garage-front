import * as types from "./actionType";

const initState = {
    login : "",
    password: "",
    auth : false
    };

export default function auth(state = initState, action) {

    if(action.type === types.LOGIN) {
        return {...state, auth: true}
    }

    if(action.type === types.EXIT) {
        return {login: "", password: "", auth: false}
    }

    if(action.type === types.EDIT_LOGIN) {
        return {...state, login: action.payload}
    }

    if(action.type === types.EDIT_PASSWORD) {
        return {...state, password: action.payload}
    }

    return state;
}