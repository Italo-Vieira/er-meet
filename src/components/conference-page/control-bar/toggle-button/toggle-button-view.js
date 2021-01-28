import React, { Component } from 'react';
import ControlButton from '../control-button'
import './toggle-button.css'

export default class ToggleButton extends Component {
    render() {
        let { text, onClick, isToggled, moreMenu } = this.props;
        let redSlash = isToggled ? <div className="redSlash"></div> : null;
        return (
            <ControlButton moreMenu={moreMenu} text={text} onClick={onClick}> 
                {this.props.children}
                {redSlash}
                
            </ControlButton>
        );
    }
}
