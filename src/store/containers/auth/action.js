import * as types from './actionType'
import fetch from "cross-fetch";
export const login = (login, password) =>
    dispatch => {
        fetch(`http://localhost:4000/auth?login=` + login +"&password=" + password , {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: "PUT"
        }).then(async response => {
            let json = await response.json();
            if(await json.answers[0] === "success") {
                dispatch({type: types.LOGIN, payload: login});
            } else {
                dispatch({type: types.EXIT});
            }
        })
    };

export const exit = () =>
    dispatch => {
            dispatch({type: types.EXIT});
    };


export const editLogin = (login) =>
    dispatch => {
        dispatch({type: types.EDIT_LOGIN, payload: login});
    };

export const editPassword = (password) =>
    dispatch => {
        dispatch({type: types.EDIT_PASSWORD, payload: password});
    };