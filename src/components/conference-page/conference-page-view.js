import React, { Component } from 'react';
import './conference-page.css';
import ParticipantList from '../participant-list';
import { BsMic, BsDisplay } from 'react-icons/bs';
import conferenceProvider from '../../conference'

export default class ConferencePageView extends Component {
    state = {
        inputValue: ''
    }

    inputChange = event => {
        this.setState({
            inputValue: event.target.value
        })
    }

    render() {
        return (
            <div className="App" style={{}}>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                    <div style={{ flex: '1' }}>
                        <video id="screenShare" autoPlay="1" style={{ margin: '10pt', borderRadius: '5pt', height: 'calc(100vh - 100pt)' }}></video>
                    </div>
                    <div className="bottomBar">
                        <div className="selfMuteDiv">
                            <button className="selfMuteButton">
                                <BsMic className="selfMute">
                                </BsMic>
                                <span className="selfMuteText">Mute</span>
                            </button>

                        </div>
                        <div style={{ flex: '1' }}>

                            <button onClick={()=> conferenceProvider.shareScreen()} className="selfMuteButton screenshare">
                                <BsDisplay className="screenShareIcon">
                                </BsDisplay>
                                <span className="selfMuteText">Mute</span>
                            </button>
                        </div>
                        <div className="endMeetingDiv">
                            <button className="endMeetingButton">End Meeting</button>
                        </div>
                    </div>
                </div>
                <ParticipantList></ParticipantList>

            </div>
        );
    }
}
