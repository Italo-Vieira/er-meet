import React, { Component } from 'react';
import {FiMonitor} from 'react-icons/fi';
import { BsMic, BsMicMute } from 'react-icons/bs';
import './participant-list-row.css'
export default class ParticipantWindow extends Component { 
    render() {
        const {mute, name, onMuteClick, id} = this.props;
        const MuteIcon = mute ? BsMicMute: BsMic;
        return <div className="userWindow2">
            <div className="userWindow">
                <FiMonitor className="userIcon"></FiMonitor>
                <span className='userName'>{name}</span>
            </div>
            <button onClick={()=> {onMuteClick(id, !mute)}} className="micIcon">
                <MuteIcon  className="actualMicIcon"></MuteIcon>
            </button>
        </div>;
    }
}
