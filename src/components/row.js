import React, {Component} from 'react';

export default class Row extends Component {

    fillRow(dbRow) {
        let resArr = [];
        for (let column in dbRow) {
            resArr.push(
                <div className={this.props.className}>
                    <input table={this.props.table} rindex={this.props.rIndex} id={dbRow["Id"]}
                           value={dbRow[column]} column={column} onChange={this.props.onChange}
                            className={this.props.class}/>
                </div>
            )
        }
        return resArr
    }

    render() {
        let dbRow = this.props.data;
        return this.fillRow(dbRow)
    }
}


