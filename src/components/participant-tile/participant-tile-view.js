import React, { Component } from 'react';
import { Video } from '../media';
import './participant-tile.css'
export default class ParticipantTile extends Component {
    render() {
        const hasMedia = true;
        let background;
        let { username, videoTrack, userId, focusedUserChanged } = this.props;
        if (hasMedia) {
            background = <Video
                id={userId}
                track={videoTrack}
            ></Video>
        } else {
            background = <div style={{ background: 'red' }}></div>
        }

        return <div onClick={() => focusedUserChanged(userId)} className="participantTile">
            <div>
                <span>{username}</span>
            </div>
            {background}
        </div>;
    }
}
