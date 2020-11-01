import React, { Component } from 'react';
import { Video } from '../media';
import './participant-tile.css'
export class ParticipantTileBig extends Component {
    render() {
        const hasMedia = true;
        let background;
        let {videoTrack, userId} = this.props;
        if (hasMedia) {
            background = <Video
                id={userId}
                track={videoTrack}
            ></Video>
        } else {
            background = <div style={{ background: 'red' }}></div>
        }

        return <div className="participantTile big">
            {background}
        </div>;
    }
}
