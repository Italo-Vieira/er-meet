import React, { Component } from 'react';
import './conference-page.css';
import ParticipantList from '../participant-list';
import { BsMic, BsDisplay } from 'react-icons/bs';
import conferenceProvider from '../../conference'
import ParticipantTile, { ParticipantTileBig } from '../participant-tile';

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
        const { focusedUser, focusedTrack } = this.props;
        const partWindowList = this.props.participantList.map(u => <ParticipantTile
            key={u.key}
            userId={u.key}
            className="videoTile"
            videoTrack={u.videoTrack}
            username={u.username}
            hasMedia={true}
        ></ParticipantTile>);
        let focusedTile;
        if(focusedUser) {

            focusedTile = <ParticipantTileBig key={focusedUser.userId} userId={focusedUser.userId} videoTrack={focusedTrack}></ParticipantTileBig>
        } 

        return (
            <div className="App" style={{}}>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                    <div className="contentFrame">
                        <div style={{ flex: '1' }}>
                            {focusedTile}
                        </div>
                        <div style={{ height: '80pt', display: 'flex' }}>
                                {partWindowList}
                            </div>
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

                                <button onClick={() => conferenceProvider.shareScreen()} className="selfMuteButton screenshare">
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
