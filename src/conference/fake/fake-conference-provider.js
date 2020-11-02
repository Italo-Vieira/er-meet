import FakeTrack from './fake-track';

export default class FakeConferenceProvider {
    constructor(conferenceHandler) {
        this._tracks = {};
    }

    _addTrack(id, videoName) {
        this._tracks[id] = new FakeTrack(id, videoName);
    }

    getTrack(id) {
        return this._tracks[id];
    }

    init() {

    }

    join() {

    }
}