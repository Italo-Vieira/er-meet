import React, { Component } from 'react';

export class Audio extends Component {
    constructor(props) {
        super(props)
        this._audioElement = null;
        this._setAudioElement = this._setAudioElement.bind(this);
        this._track = this.props.track;
    }

    componentDidMount() {
        this._track.attach(this._audioElement)
    }

    componentDidUpdate() {
        this._track.attach(this._audioElement);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let newTrack = nextProps.track;
        if(this._track !== newTrack) {
            this._track.detach(this._audioElement);
            this._track = newTrack;
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        this._track.detach(this._audioElement);
    }

    render() {
        let hide = this.props.hide ? "none": "initial";
        return <audio
            data-testid={this.props.id + "-audio-id"}
            id={this.props.id}
            style={{display: hide}}
            autoPlay={true}
            className={this.props.className}
            ref={this._setAudioElement}
        ></audio>;
    }

    _setAudioElement(element) {
        this._audioElement = element;
    }
}
