import React, { Component } from 'react';
import { Video } from '../media';
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
        let { user, supressOverlay, big } = this.props;
        let videoTrack = user.videoTrack;

        if (videoTrack && videoTrack.isReady()) {
            background = <Video
                id={user.userId}
                track={videoTrack}
            ></Video>
        } else {
            background = <div data-testid="tile-placeholder" className="defaultTileBg"><BsFillPersonFill className='tileUserIcon' /></div>
        }

        let overlay = <div>
            <span>{user.username}</span>
        </div>;

        if (supressOverlay) {
            overlay = null;
        }

        let className = "participantTile";
        if(big) {
            className += " big"
        }

        return <div data-testid="part-tile-id" onClick={this._onClick} className={className}>
            {overlay}
            {background}
        </div>;
    }
}
