import React, { Component } from 'react';
import './control-bar.css';
import { BsMic, BsDisplay, BsCameraVideo, BsPeople } from 'react-icons/bs';
import ControlButton from '../control-button';
export default class ControlBar extends Component {

    render() {
        let { togglePartList } = this.props;

        return (
            <div className="bottomBar">
                <div className="relative">
                    <div className="leftControls">
                        <ControlButton text="Mute">
                            <BsMic className="cameraIcon" />
                        </ControlButton>
                        <ControlButton text="Camera">
                            <BsCameraVideo className="cameraIcon" />
                        </ControlButton>
                    </div>
                </div>
                <div className="centerControls">
                    <ControlButton text="Screen Share">
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
