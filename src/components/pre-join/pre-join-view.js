import React from 'react';
import ParticipantTile from '../participant-tile/participant-tile-view';
import './pre-join.css'
import Track from '../../conference/track'
import conferenceProvider from '../../conference'

export default class PreJoinPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            audioInputDevices: [],
            audioOutputDevice: [],
            videoInputDevices: [],
            localUser: {},
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit() {
        return (e) => {
            e.preventDefault();
            let { localUserNameChanged, preJoinCompleted, roomName} = this.props;
            localUserNameChanged(this.state.value);
            preJoinCompleted();
            conferenceProvider.join({
                roomName,
                username: this.state.value,
            });
        }
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({audio: true, video: true}).then((media) => {
            navigator.mediaDevices.getUserMedia({video: true}).then(videoMedia => {
                if(videoMedia) {
                    console.log(videoMedia)
                    let track = new Track(videoMedia);
                    let user = {
                        userId: "sdsd",
                        videoTrack: track,
                    }
                    this.setState({
                        localUser: user
                    })
                }
            })

        }).then(() => {
            return navigator.mediaDevices.enumerateDevices();
        }).then(devices => {
            console.log(devices)
            this.setState({
                audioInputDevices: devices.filter(d => d.kind === "audioinput"),
                audioOutputDevice: devices.filter(d => d.kind === "audiooutput"),
                videoInputDevices: devices.filter(d => d.kind === "videoinput")
            })
            let videoStreams = devices.filter(d => d.kind === "videoinput");


        })
    }
    render() {
        let { audioInputDevices, audioOutputDevice, videoInputDevices, localUser} = this.state;
        let inputOptions = audioInputDevices.map(device => <option value={device.deviceId}>{device.label}</option>)
        let outputOptions = audioOutputDevice.map(device => <option value={device.deviceId}>{device.label}</option>)
        let videoInputOptions = videoInputDevices.map(device => <option value={device.deviceId}>{device.label}</option>)
        if(videoInputOptions.length === 0) {
            videoInputOptions = <option value="" disabled selected>Select your device</option>
        }
        if(outputOptions.length === 0) {
            outputOptions = <option value="" disabled selected>Select your device</option>
        }
        if(inputOptions.length === 0) {
            inputOptions = <option value="" disabled selected>Select your device</option>
        }

        return (
            <div className="lading-page">
                <div className="pre-join-header flex-column" >
                    <div className="logo-name dark"><span className="logo-semibold">Er</span><span className="logo-extra-thin"> Meet</span></div>
                </div>
                <div className="pre-join-content flex-row">
                    <div className="flex-column">
                        <h2>Before you join</h2>
                        <div className="field is-inline">
                            <label className="label is-small">This is your meeting code:</label>
                            <div className="control flex-fill">
                                <div className="input is-fill is-small is-center-text readonly-div" type="text" disabled placeholder="Text input">
                                    ZXR238SIU
                                </div>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit(() =>{}, "preJoin")}>
                            <div className="field">
                                <div className="control">
                                    <input 
                                    value={this.state.value} 
                                    onChange={this.handleChange}
                                    className="input is-fill is-center-text" type="text" placeholder="What is your name?">
                                    </input>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-fill">Join</button>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className="fixed-aspect-ratio">
                        <div className="fixed-aspect-ratio-content">
                                <ParticipantTile 
                                    user={localUser}
                                    big='true'
                                    suppressOverlay='true'>
                                </ParticipantTile>
                        </div>
                    </div>
                </div>
                <div className="flex-fill" style={{backgroundColor: "White"}}> </div>
                <div className="front-footer">

                </div>

    </div>);
    }
}


/**
   <h2>Configure your devices</h2>
                        <div className="field">
                            <label className="label">Camera:</label>
                            <div className="control">
                                <select className="select is-fill" type="text" placeholder="Text input">
                                    {videoInputOptions}
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Speaker:</label>
                            <div className="control">
                                <select className="select is-fill" type="text" placeholder="Text input">
                                    {outputOptions || <option value="" disabled selected>Select your device</option>}
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Microphone:</label>
                            <div className="control">
                                <select className="select is-fill" type="text" placeholder="Text input">
                                    {inputOptions || <option value="" disabled selected>Select your device</option>}
                                </select>
                            </div>
                        </div>
                        <div className="flex-column flex-fill">

                        </div>
 */