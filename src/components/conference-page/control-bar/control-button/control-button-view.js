import React, { Component } from 'react';
import './control-button.scss';

export default class ControlButton extends Component {
    render() {
        let { text, onClick } = this.props;
        return (
            <button onClick={onClick} className="controlBtn">
                {this.props.children}
                <span className="controlText">{text}</span>
            </button>
        );
    }
}
