import React, { Component } from 'react';
import { FiMonitor } from 'react-icons/fi';
import { BsMic, BsMicMute } from 'react-icons/bs';
import './participant-row.scss';

export default class ParticipantRow extends Component {
    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        const { mute, onMuteClick, userId } = this.props;
        onMuteClick && onMuteClick(userId, !mute);
    }

    render() {
        const { mute, name, userId } = this.props;

        const MuteIcon = mute ? BsMicMute : BsMic;

        return <div data-testid={userId + "-part-row"} className="userWindow2">
            <div className="userWindow">
                <FiMonitor className="userIcon"></FiMonitor>
                <span className='userName'>{name}</span>
            </div>
            <button 
                data-testid={userId + "-part-row-mute"}
                onClick={this._onClick} 
                className="mic-button">
                <MuteIcon className="mic-icon"></MuteIcon>
            </button>
        </div>;
    }
}
