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

    join(options) {
        console.log("test?")
        this.conferenceHandler.onConferenceJoined("localUserId")
        this.conferenceHandler.onUserJoined("localUserId", options.username);
    }

    async muteParticipant(userId, mute) {
        this.conferenceHandler.onUserMuted(userId, mute);
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