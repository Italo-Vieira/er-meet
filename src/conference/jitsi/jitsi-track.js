import Track from '../track'

export default class JitsiTrack extends Track{
    constructor(jitsiTrack) {
        super()
        this._jitsiTrack = jitsiTrack;
    }

    attach(htmlElement) {
        this._jitsiTrack.attach(htmlElement);
    }

    detach(htmlElement) {
        this._jitsiTrack.detach(htmlElement);
    }

    isVideo() {
        return true;
    }

    getId() {
        return this._jitsiTrack.getId()
    }
}