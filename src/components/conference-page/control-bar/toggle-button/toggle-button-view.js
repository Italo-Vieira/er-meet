import React, { Component } from 'react';
import ControlButton from '../control-button'
import './toggle-button.css'

export default class ToggleButton extends Component {
    render() {
        let { text, onClick, isToggled } = this.props;
        let redSlash = isToggled ? <div className="redSlash"></div> : null;
        return (
            <ControlButton text={text} onClick={onClick}> 
                {this.props.children}
                {redSlash}
            </ControlButton>
        );
    }
}
