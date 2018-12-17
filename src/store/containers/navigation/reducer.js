import * as types from "./actionType";

const initState = {
    view: "list",
    dbData: undefined
};

export default function auth(state = initState, action) {

    if(action.type === types.CHANGE_VIEW) {
        return {...state, view: action.payload.view, dbData: action.payload.dbData}
    }

    return state;
}