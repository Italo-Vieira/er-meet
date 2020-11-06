import React, { Component } from 'react';
import './control-bar.css';
import { BsMic, BsDisplay, BsCameraVideo, BsPeople } from 'react-icons/bs';
import ControlButton from './control-button';
import conferenceProvider from '../../../conference';
import ToggleButton from './toggle-button';

export default class ControlBar extends Component {

    render() {
        let { togglePartList, meUser } = this.props;

        let toggleCamera = conferenceProvider.toggleCamera.bind(conferenceProvider);
        let shareScreen = conferenceProvider.shareScreen.bind(conferenceProvider);
        return (
            <div className="bottomBar">
                <div className="relative">
                    <div className="leftControls">
                        <ToggleButton text="Mute" isToggled={true}>
                            <BsMic className="cameraIcon" />
                        </ToggleButton>
                        <ToggleButton onClick={toggleCamera} text="Camera" isToggled={meUser.isCameraMuted}>
                            <BsCameraVideo className="cameraIcon" />
                        </ToggleButton>
                    </div>
                </div>
                <div className="centerControls">
                    <ControlButton onClick={shareScreen} text="Screen Share">
                        <BsDisplay className="screenShareIcon">
                        </BsDisplay>
                    </ControlButton>
                    <ControlButton onClick={togglePartList} text="Participants">
                        <BsPeople className="cameraIcon" />
                    </ControlButton>
                </div>
                <div className="relative">
                    <div className="rightControls">
                        <button className="endMeetingButton">End Meeting</button>
                    </div>
                </div>
            </div>
        );
    }
}

/*
                <div className="endMeetingDiv">
                    <button className="endMeetingButton">End Meeting</button>
                </div>

                <div style={{ flex: '1' }}>

                    <button onClick={() => conferenceProvider.shareScreen()} className="selfMuteButton screenshare">
                        <BsDisplay className="screenShareIcon">
                        </BsDisplay>
                        <span className="selfMuteText">Mute</span>
                    </button>
                </div>
            */
