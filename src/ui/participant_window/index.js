import React, { Component } from 'react';
import {FiMonitor} from 'react-icons/fi';
import { BsMic } from 'react-icons/bs';

export class ParticipantWindow extends React.Component {
    render() {
        return <div className="userWindow2">
            <div className="userWindow">
                <FiMonitor className="userIcon"></FiMonitor>
                <span className='userName'>{this.props.name}</span>
            </div>
            <div class="micIcon">
                <BsMic class="actualMicIcon"></BsMic>
            </div>
        </div>;
    }
}
