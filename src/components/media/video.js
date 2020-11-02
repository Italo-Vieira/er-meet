import React, { Component } from 'react';

export class Video extends Component {
    constructor(props) {
        super(props)
        this._videoElement = null;
        this._setVideoElement = this._setVideoElement.bind(this);
        this._track = this.props.track;
    }

    componentDidMount() {
        this._track.attach(this._videoElement)
    }


    componentWillUnmount() {
        // TODO: beware of chrome bug were we get black screen when chaning src of video
        // this._track.detach(this._videoElement);
    }

    render() {
        return <video
            data-testid={this.props.id + "-video-id"}
            id={this.props.id}
            autoPlay={true}
            className={this.props.className}
            ref={this._setVideoElement}
        ></video>;
    }

    _setVideoElement(element) {
        this._videoElement = element;
    }
}
