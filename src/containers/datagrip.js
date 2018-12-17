import React, {Component} from 'react';
import {connect} from 'react-redux';
import Row from '../components/row'
import Log from '../components/log'
import Construct from '../components/construct'
import Button from '../components/button'
import Combobox from 'react-widgets/lib/Combobox'
import {editDbData, getTable, editTable, insertRow, deleteRow, selectRow, editRequestAction, editFilter, left, right} from '../store/containers/datagrip/action';
import '../styles/datagrip.css'
import 'react-widgets/dist/css/react-widgets.css';


class DataGrip extends Component {

    constructor(props) {
        super(props);
        this.props.getTable("masters");
    }

    getTable = (value) => {
        this.props.getTable(value);
    };

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
            id      : ++this.props.store.datagrip.maxId +""
        };
        this.props.insertRow(action);
    };

    deleteRow = () => {
        let rIndex  = this.props.store.datagrip.selected[0].rIndex,
            action = {
            action  : "DELETE",
            table   : this.props.store.datagrip.table,
            id      : this.props.store.datagrip.selected[0].id +""
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

    editFilter = (event) => {
        this.props.editFilter({
            column: event.target.getAttribute("column"),
            value: event.target.value })
    };

    right = () => {
        let index = 0,
            showEnd = this.props.store.datagrip.showFrom + this.props.store.datagrip.showCount;
        for (let i = this.props.store.datagrip.showFrom; i < this.props.store.datagrip.dbData.length && i < showEnd ; i++) {
            let filtered = false,
                filters = this.props.store.datagrip.filter;
            for (let key in filters) {
                if(this.props.store.datagrip.dbData[i][key].toString().indexOf(filters[key]) < 0)
                    filtered = true;
            }
            if (!filtered)
                index++;
        }
        if (index === this.props.store.datagrip.showCount)
            this.props.right(showEnd)
    };

    left = () => {
        let showFrom = this.props.store.datagrip.showFrom - this.props.store.datagrip.showCount;
        if (showFrom < 0) showFrom = 0;
        this.props.left(showFrom)
    };


    fillGrip(dbData) {
        let resArr = [],
            index = 0,
            showEnd = this.props.store.datagrip.showFrom + this.props.store.datagrip.showCount;
        for (let i = this.props.store.datagrip.showFrom; i < dbData.length && i < showEnd ; i++) {
            let filtered = false,
                filters = this.props.store.datagrip.filter;
            for (let key in filters) {
                if(dbData[i][key].toString().indexOf(filters[key]) < 0)
                    filtered = true;
            }
            if (!filtered)
                resArr.push(
                    <div className="row">
                        <div className="index" onClick={this.selectRow} rIndex={i}>
                            <label rIndex={i}>{++index}</label>
                        </div>
                        <Row class="elem" className="col-md-2 col-lg-2 col-xl-2 datagrip-row" data={dbData[i]} rIndex={i} table={this.props.store.datagrip.table}
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
                <div className="col-md-2 col-lg-2 col-xl-2 elem header-elem">
                    <label >
                        { column }
                    </label>
                </div>
            )
        }
        return resArr
    }

    fillFilters(firstDbRow) {
        let resArr = [];
        for (let column in firstDbRow) {
            resArr.push(
                <div className="col-md-2 col-lg-2 col-xl-2 datagrip-row">
                    <input className="elem" column={column} placeholder={column} onChange={this.editFilter}/>
                </div>
            )
        }
        return resArr
    }

    render() {
        console.log(this.props.data);
        let dbData = this.props.data || this.props.store.datagrip.dbData,
            constructArray = this.props.store.datagrip.requestedActions.length > 0 ?
                this.props.store.datagrip.requestedActions
                : this.props.store.datagrip.lastRequestedActions;
        return (
            <div className="container">
                <div className="row">
                    <Combobox
                        onChange={this.getTable}
                        dropDown
                        data={[
                            'masters',
                            'services',
                            'cars',
                            'works'
                        ]}
                    />
                    <Button className="array"  label="https://img.icons8.com/office/50/000000/left.png" onClick={this.left}/>
                    <Button className="array" label="https://img.icons8.com/office/50/000000/right.png" onClick={this.right}/>
                    <Button className="" label="https://img.icons8.com/dusk/50/000000/replay.png" onClick={this.refresh}/>
                    { this.props.store.auth.auth && <Button className="" label="https://img.icons8.com/office/50/000000/upload.png" onClick={this.push}/> }
                    { this.props.store.auth.auth && <Button className="" label="https://img.icons8.com/office/50/000000/edit-file.png" onClick={this.insertRow}/> }
                    { this.props.store.auth.auth && <Button className="" label="https://img.icons8.com/office/16/000000/delete-row.png" onClick={this.deleteRow}/> }
                </div>
                <div className="row filters-row">
                    <div className="index-poor">
                    </div>
                    { this.fillFilters(dbData[0]) }
                </div>
                <div className="row">
                    <div className="index index-s">
                        <label>
                            #
                        </label>
                    </div>
                    { this.fillHeader(dbData[0]) }
                </div>
                <div>
                    { this.fillGrip(dbData) }
                </div>
                <div className="container">
                    <div className="row">
                        <Construct className="col-md-6" actions={constructArray} />
                        <Log className="col-md-6" responses={this.props.store.datagrip.response} />
                    </div>
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
    },
    editFilter : (filter) => {
        dispatch(editFilter(filter))
    },
    right : (showFrom) => {
        dispatch(right(showFrom))
    },
    left : (showFrom) => {
        dispatch(left(showFrom))
    }
    })
)(DataGrip)