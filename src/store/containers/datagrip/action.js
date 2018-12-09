import * as types from './actionType'
import fetch from "cross-fetch";
export const getTable = (table) =>
    dispatch => {
        fetch(`http://localhost:4000/list/` + table, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: "GET"
        }).then(async response => {
            let json = await response.json(),
                maxId = await json.reduce((prev, curr) => {
                    return curr["Id"] > prev ? curr["Id"] : prev
                }, 0);

            dispatch({type: types.CLEAN_UP});
            dispatch({type: types.GET, payload: {
                    dbData: await json,
                    table: table,
                    maxId: maxId
                }});
        })
    };

export const editTable = (requestActions) =>
    dispatch => {
        fetch(`http://localhost:4000/edit`, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: "PUT",
            body: JSON.stringify(requestActions)
        }).then(async response => {
            let payload = await response.json();
            console.log(await payload.answers);
            dispatch({type: types.PUT, payload: await payload.answers});
        })
    };


export const editRequestAction = (changedData, action) =>
    dispatch => {
            dispatch({type: types.EDIT_DATA, payload: changedData});
            dispatch({type: types.EDIT_REQUEST, payload: action});
    };

export const insertRow = (action) =>
    dispatch => {
        dispatch({type: types.INSERT, payload: action});
        dispatch({type: types.EDIT_REQUEST, payload: action});
    };

export const deleteRow = (action, rIndex) =>
    dispatch => {
        dispatch({type: types.DELETE, payload: rIndex});
        dispatch({type: types.EDIT_REQUEST, payload: action});
    };

export const selectRow = ({id, rIndex}) =>
    dispatch => {
        dispatch({type: types.SELECT, payload: [{id, rIndex }]});
    };

export const editFilter = ({column, value}) =>
    dispatch => {
        dispatch({type: types.EDIT_FILTERS, payload: {column, value}});
    };

export const left = (showFrom) =>
    dispatch => {
        dispatch({type: types.LEFT, payload: showFrom});
    };

export const right = (showFrom) =>
    dispatch => {
        dispatch({type: types.RIGHT, payload: showFrom});
    };

