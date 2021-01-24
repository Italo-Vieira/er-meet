import ConferenceHandler from '../conference_handler';
import FakeTrack from './fake-track';

export default class FakeConferenceProvider {
    constructor(conferenceHandler) {
        this._tracks = {};
    }
    /**
     * 
     * @param {ConferenceHandler} conferenceHandler 
     */
    init(conferenceHandler) {
        this.conferenceHandler = conferenceHandler;
    }

    _addTrack(id, videoName) {
        this._tracks[id] = new FakeTrack(id, videoName);
    }

    getTrack(id) {
        return this._tracks[id];
    }

    join() {
        console.log("test?")
        this.conferenceHandler.onConferenceJoined("dfdf")
        this.conferenceHandler.onUserJoined("dfdf")
    }

    leaveConference() {

    }

    toggleCamera() {

    }

    shareScreen() {

    }

    toggleAudio() {
        
    }
}