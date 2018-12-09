import React, {Component} from 'react';
import {connect} from 'react-redux';
import Row from '../components/row'
import Button from '../components/button'
import {getTable, editTable, insertRow, deleteRow, selectRow, editRequestAction} from '../store/containers/datagrip/action';

class DataGrip extends Component {

    constructor(props) {
        super(props);
        this.props.getTable("services");
    }

    refresh = () => {
        this.props.getTable(this.props.store.datagrip.table);
    };

    push = () => {
        this.props.editTable(this.props.store.datagrip.requestedActions);
    };

    insertRow = () => {
        let action = {
            action  : "INSERT",
            table   : this.props.store.datagrip.table,
            id      : ++this.props.store.datagrip.maxId+""
        };
        this.props.insertRow(action);
    };

    deleteRow = () => {
        let rIndex  = this.props.store.datagrip.selected[0].rIndex,
            action = {
            action  : "DELETE",
            table   : this.props.store.datagrip.table,
            id      : this.props.store.datagrip.selected[0].id +"",
        };
        this.props.deleteRow(action, rIndex);
    };

    selectRow = (event) => {
        let rIndex = event.target.getAttribute("rindex");
        this.props.selectRow({ rIndex: rIndex, id: this.props.store.datagrip.dbData[rIndex].Id });
    };

    editRequestAction = (event) => {
        let column = event.target.getAttribute("column"),
            rIndex = event.target.getAttribute("rindex"),
            table = event.target.getAttribute("table"),
            action = {
                action  : "UPDATE",
                table   : table,
                id      : event.target.id,
                update  : [
                    {
                        column  : column,
                        value   : event.target.value
                    }
                ]
            },
            changedData = {
                rIndex  : rIndex,
                table   : table,
                value: event.target.value,
                column: column
            };
        this.props.editRequestAction(changedData, action)
    };

    fillGrip(dbData) {
        let resArr = [];
        for (let i = 0; i < dbData.length; i++) {
            resArr.push(
                <div className="row">
                    <div className="col-md-2" onClick={this.selectRow} rIndex={i}>
                        <label rIndex={i}>{i}</label>
                    </div>
                    <Row className="col-md-2" data={dbData[i]} rIndex={i} table={this.props.store.datagrip.table}
                    onChange={this.editRequestAction}/>
                </div>
            )
        }
        return resArr
    }

    fillHeader(firstDbRow) {
        let resArr = [];
        for (let column in firstDbRow) {
            resArr.push(
                <div className="col-md-2">
                    <label>
                        { column }
                    </label>
                </div>
            )
        }
        return resArr
    }

    render() {
        let dbData = this.props.store.datagrip.dbData;
        return (
            <div className="container">
                <div className="row">
                    <Button className="col-md-3" label="refresh" onClick={this.refresh}/>
                    <Button className="col-md-3" label="push" onClick={this.push}/>
                    <Button className="col-md-3" label="insert" onClick={this.insertRow}/>
                    <Button className="col-md-3" label="delete" onClick={this.deleteRow}/>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label>
                            #
                        </label>
                    </div>
                    { this.fillHeader(dbData[0]) }
                </div>
                <div>
                    { this.fillGrip(dbData) }
                </div>
            </div>
        )
    }
}

export default connect(state => ({
        store: state
    }), dispatch => ({
    getTable : (table) => {
        dispatch(getTable(table))
    },
    editTable : (requestedActions) => {
        dispatch(editTable(requestedActions))
    },
    insertRow : (requestedActions) => {
        dispatch(insertRow(requestedActions))
    },
    deleteRow : (requestedActions, rIndex) => {
        dispatch(deleteRow(requestedActions, rIndex))
    },
    selectRow : (requestedActions) => {
        dispatch(selectRow(requestedActions))
    },
    editRequestAction : (changedData, reqAction) => {
        dispatch(editRequestAction(changedData, reqAction))
    }
    })
)(DataGrip)