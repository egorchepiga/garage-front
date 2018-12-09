import React, {Component} from 'react';

export default class Log extends Component {

    fillLog(responses) {
        let resArr = [];
        for (let i = 0; i < responses.length; i++) {
            resArr.push(
                <div>
                    <label>
                        {i+1 + ": "+ responses[i]}
                    </label>
                </div>
            )
        }
        return resArr
    }

    render() {
        let responses = this.props.responses;
        return (
            <div className={this.props.className}>
                { this.fillLog(responses) }
            </div>
        )
    }
}


