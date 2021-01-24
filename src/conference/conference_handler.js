import * as actions from '../redux/actions'

export default class ConferenceHandler {
    constructor(reduxStore) {
        this.reduxStore = reduxStore
        this.dispatchActions = new Proxy(actions
            , {
            get (receiver, name) {
                return function(...args) {
                    return reduxStore.dispatch(receiver[name](...args))
                }
            }
        });
    }

    onUserJoined(userId, username="Unnamed Maluco", isCameraMuted=true) {
        
        // TODO: dispatch error if user id is undefined
        let user = {
            userId,
            username,
            isCameraMuted
        }



        this.reduxStore.dispatch(actions.userJoined(user));
        this.reduxStore.dispatch(actions.changePage('conference'));
    }

    onMuteUser(userId, muteState) {
        this.reduxStore.dispatch(actions.muteUser(userId, muteState))
    }

    onUserLeft(userId) {
        this.reduxStore.dispatch(actions.userLeft(userId));
    }

    onDisplayNameChanged(userId, displayName) {
        this.reduxStore.dispatch(actions.userNameChanged(userId, displayName))
    }

    onConferenceJoined(meUserId) {
        this.dispatchActions.meUserCreated(meUserId);
    }

    onUserSpeaking() {

    }

    onConferenceEnded() {

    }

    onVideoTrackAdded(userId, track) {
        this.reduxStore.dispatch(actions.videoTrackAdded(userId, track.getId()))
    }

    onVideoTrackRemoved(userId, trackId) {
        this.reduxStore.dispatch(actions.videoTrackRemoved(userId, trackId))
    }

    onAudioTrackAdded(userId, track) {
        this.reduxStore.dispatch(actions.audioTrackAdded(userId, track.getId()))
    }

    onAudioTrackRemoved(userId, trackId) {
        this.reduxStore.dispatch(actions.audioTrackRemoved(userId, trackId))
    }

    onUserCameraMuted(userId, isMuted) {
        this.reduxStore.dispatch(actions.userCameraMuted(userId, isMuted));
    }

    onUserMuted(userId, isMuted) {
        this.reduxStore.dispatch(actions.userMicMuted(userId, isMuted));
    }

    onScreenShareStarted(userId, trackId) {
        this.reduxStore.dispatch(actions.screenShareStarted(userId, trackId));
    }

    onScreenShareStopped(userId, trackId) {
        this.reduxStore.dispatch(actions.screenShareStopped(userId, trackId));
    }

    onConferenceLeft() {
        this.reduxStore.dispatch(actions.conferenceLeft())
    }
}