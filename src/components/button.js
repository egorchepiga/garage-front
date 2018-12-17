import React, {PureComponent} from 'react';

export default class Button extends PureComponent {

    render() {

        let textLabel = this.props.textLabel,
            className = this.props.className;
            className += this.props.active ? ' active ' : '';

        return (
            !textLabel ?
                <button className={"button " + className} id={this.props.id} onClick={this.props.onClick} >
                    <img src={this.props.label}/>
                </button> :
                <button className={"button " + className} id={this.props.id} onClick={this.props.onClick} >
                    <label>{this.props.label}</label>
                </button>
        );
    }
}

