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

    isReady() {
        return !this._jitsiTrack.isMuted() && this._jitsiTrack.isActive();
    }

    isMuted() {
       return this._jitsiTrack.isMuted(); 
    }

    mute(mute) {
        if(mute) {
            return this._jitsiTrack.mute();
        } else {
            return this._jitsiTrack.unmute();
        }
    }
}