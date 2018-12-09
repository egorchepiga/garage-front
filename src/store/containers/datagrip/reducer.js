import * as types from "./actionType";

const initState = {
    table: "",
    dbData : [],
    selected: [ {
        id: -1,
        rIndex: -1 } ],
    maxId: 0,
    response: [],
    requestedActions: [],
    lastRequestedActions: [],
    filter: {},
    showCount : 20,
    showFrom : 0
};

export default function datagrip(state = initState, action) {

    if (action.type === types.CLEAN_UP) {
        return {...state, requestedActions: [], lastRequestedActions: [], response: []};
    }

    if (action.type === types.LEFT) {
        return {...state, showFrom: action.payload};
    }

    if (action.type === types.RIGHT) {
        return {...state, showFrom: action.payload};
    }

    if (action.type === types.GET) {
        return {...state, table: action.payload.table, dbData: action.payload.dbData, maxId: action.payload.maxId};
    }
    if (action.type === types.PUT) {
        return {...state, response: action.payload, requestedActions: [], lastRequestedActions: state.requestedActions};
    }

    if (action.type === types.INSERT) {
        let dbData = state.dbData;
        let row = Object.create(dbData[0]);
        for (let key in row) {
            row[key] = "";
        }
        row["Id"] = action.payload.id;
        dbData.unshift(row);
        return {...state, dbData: dbData, maxId : row.Id};
    }

    if (action.type === types.SELECT) {
        return {...state, selected: action.payload};
    }

    if (action.type === types.DELETE) {
        let dbData = state.dbData;
        dbData.splice(action.payload,  1);
        return {...state, dbData: dbData};
    }

    if (action.type === types.EDIT_DATA) {
        let dbData = state.dbData;
        dbData[action.payload.rIndex][action.payload.column] = action.payload.value;
        return {...state, dbData: dbData};
    }

    if (action.type === types.EDIT_FILTERS) {
        let filters = state.filter;
            for (let key in filters) {
                if( key === action.payload.column) {
                    filters[key] = action.payload.value;
                    return {...state, filter: filters};
                }
            }
            filters[action.payload.column] = action.payload.value;
        return {...state, filter: filters};
    }

    if (action.type === types.EDIT_REQUEST) {
        let reqActions = state.requestedActions;
        if (action.payload.update) {
            for (let i = 0; i < reqActions.length; i++) {
                if (reqActions[i].id === action.payload.id || reqActions[i].newId === action.payload.id) {

                    if (action.payload.update[0].column === "Id") {
                        if(reqActions[i].action === "INSERT")
                            reqActions[i].id = action.payload.update[0].value;
                        else
                            reqActions[i].newId = action.payload.update[0].value;
                    }
                    if(reqActions[i].update) {
                        for (let j = 0; j < reqActions[i].update.length; j++) {
                            if (reqActions[i].update[j].column === action.payload.update[0].column) {
                                reqActions[i].update[j].value = action.payload.update[0].value;
                                return {...state, requestedActions: reqActions};
                            }
                        }
                        reqActions[i].update.push(action.payload.update[0]);
                    } else {
                        reqActions[i].update = action.payload.update;
                    }
                    return {...state, requestedActions: reqActions};
                }
            }

            if (action.payload.update[0].column === "Id") {
                action.payload.newId = action.payload.update[0].value;
            }
            return {...state, requestedActions : [...state.requestedActions, action.payload]};

        } else {
            if (action.payload.action === "DELETE") {
                for (let i = 0; i < reqActions.length; i++) {
                    if (reqActions[i].id === action.payload.id) {
                        if (reqActions[i].action === "INSERT") {
                            reqActions.splice(i, 1);
                            return {...state, requestedActions: reqActions};
                        }
                    }
                }
            }

            return {...state, requestedActions : [...state.requestedActions, action.payload]};
        }
    }
    return state;
}