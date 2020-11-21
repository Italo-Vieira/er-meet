import React, { Component } from 'react';
import { Video, Audio } from '../media';
import './participant-tile.css'

import { BsFillPersonFill } from 'react-icons/bs';

export default class ParticipantTile extends Component {
    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        let { onTileClick, user} = this.props;
        onTileClick && onTileClick(user.userId);
    }

    render() {
        let background;
        let { user, suppressOverlay, big, renderAudio } = this.props;
        let videoTrack = user.videoTrack;
        let audioTrack = user.audioTrack;

        if (videoTrack?.isReady()) {
            background = <Video
                id={user.userId}
                track={videoTrack}
            ></Video>
        } else {
            background = <div data-testid="tile-placeholder" className="defaultTileBg"><BsFillPersonFill className='tileUserIcon' /></div>
        }

        let audioTrackEl;
        if (renderAudio && audioTrack?.isReady()) {
            audioTrackEl = <Audio
                id={user.userId}
                track={audioTrack}
            ></Audio>
        } 


        let overlay = <div data-testid="tile-overlay-id">
            <span>{user.username}</span>
        </div>;

        if (suppressOverlay) {
            overlay = null;
        }

        let className = "participantTile";
        if(big) {
            className += " big"
        }

        let divId = 'part-tile' + (big ?'-big': '') + `-${user.userId}`;

        return <div id={divId} data-testid="part-tile-id" onClick={this._onClick} className={className}>
            {overlay}
            {background}
            {audioTrackEl}
        </div>;
    }
}
