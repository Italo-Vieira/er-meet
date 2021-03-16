import React, { Component } from 'react';
import './device-selector.scss'
import ListSelector from '../../list-selector'
import conferenceProvider from '../../../conference'
import { conferenceIdSet } from '../../../redux/actions';

export default class DeviceSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            audioInputDevices: [],
            audioOutputDevice: [],
            videoInputDevices: [],
            localUser: {},
            value: ""
        }
    }

    componentDidMount() {

        navigator.mediaDevices.enumerateDevices().then(devices => {
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
        let { audioInputDevices, audioOutputDevice, videoInputDevices, localUser } = this.state;
        let deviceToOption = device => ({value: device.deviceId, label: device.label});
        let inputOptions = audioInputDevices.map(deviceToOption)
        let outputOptions = audioOutputDevice.map(deviceToOption)
        let videoInputOptions = videoInputDevices.map(deviceToOption)
        console.log("vamos ver", conferenceProvider)
        return (
            <div className="device-selector">
                <ListSelector title="Camera" default={conferenceProvider.getActiveVideoInputDevice()} items={videoInputOptions} onChange={console.log}>
                </ListSelector>

                <ListSelector title="Speaker" default={conferenceProvider.getActiveAudioOutputDevice()} items={outputOptions} onChange={conferenceProvider.setActiveAudioOutput}>
                </ListSelector>

                <ListSelector title="Microphone" default={conferenceProvider.getActiveAudioInputDevice()} items={inputOptions} onChange={console.log}>
                </ListSelector>
            </div>
        );
    }
}
/*<div className="field">
    <label className="label">Microphone:</label>
    <div className="control">
        <ul type="text" placeholder="Text input">
            {inputOptions || <option value="" disabled selected>Select your device</option>}
        </ul>
    </div>
</div>*/