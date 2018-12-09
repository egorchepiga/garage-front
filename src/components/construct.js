import React, {Component} from 'react';

export default class Construct extends Component {

    fillConstruct(actions) {
        let resArr = [];
        for (let i = 0; i < actions.length; i++) {
            let action = actions[i];
            let update = action.update ? action.update.map((update) => {
                return " SET " + update.column+ ": "+update.value
            }) : "";
            resArr.push(
                <div>
                    <label>
                        {i+1 + ": "+ action.action + " id: " +action.id + " " + update }
                    </label>
                </div>
            )
        }
        return resArr
    }

    render() {
        let actions = this.props.actions;
        return (
            <div className={this.props.className}>
                { this.fillConstruct(actions) }
            </div>
        )
    }
}


