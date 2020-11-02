import React, { Component } from 'react';
import './control-button.css';

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
