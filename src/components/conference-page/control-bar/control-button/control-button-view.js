import React, { Component } from 'react';
import './control-button.scss';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class ControlButton extends Component {
    render() {
        let { text, onClick, moreMenu} = this.props;
        let hasMore = "";
        if(moreMenu) {
            hasMore = "has-more";
        }
        return (
            <div>
                {moreMenu && <div style={{position: "relative"}}>
                        <Popup className="control force-left" keepTooltipInside="body" trigger={<button className="more">^</button>} position="top center">
                            <div>{moreMenu}</div>
                        </Popup>      
                </div>}
                <button onClick={onClick} 
                    className={`controlBtn ${hasMore}`}>
                    {this.props.children}
                    <span className="controlText">{text}</span>
                </button>
            </div>
        );
    }
}
