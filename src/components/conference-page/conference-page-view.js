import React, { Component } from 'react';
import './conference-page.scss';
import ParticipantList from '../participant-list';
import ParticipantTile from '../participant-tile';
import TileList from '../tile-list';
import ControlBar from './control-bar';

export default class ConferencePageView extends Component {
    render() {
        const { focusedUser } = this.props;
        let focusedTile;

        if (focusedUser) {
            focusedTile = <ParticipantTile
                key={focusedUser.userId}
                user={focusedUser}
                big='true'
                suppressOverlay='true'
            ></ParticipantTile>
        }

        return (
            <div className="App" style={{}}>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                    <div className="contentFrame">
                        <div style={{ flex: '1' , overflow: 'hidden'}}>
                            {focusedTile}
                        </div>
                        <TileList />
                    </div>
                    <ControlBar></ControlBar>
                </div>
                <ParticipantList></ParticipantList>

            </div>
        );
    }
}
