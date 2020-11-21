import React, { Component } from 'react';
import './tile-list.css'
import ParticipantTile from '../participant-tile'

export default class TileList extends Component {

    render() {
        const { participantList, changeUserFocus } = this.props;
        const tiles = participantList.map(u => <ParticipantTile
            key={u.userId}
            user={u}
            onTileClick={changeUserFocus}
            className="videoTile"
            renderAudio={true}
        ></ParticipantTile>);

        return <div className="tile-list">
            {tiles}
        </div>
    }
}
