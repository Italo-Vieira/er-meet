import * as actions from '../redux/actions'

export default class ConferenceHandler {
    constructor(reduxStore) {
        this.reduxStore = reduxStore
    }

    onUserJoined(userId, username="Unnamed Maluco", isCameraMuted=true) {
        // TODO: dispatch error if user id is undefined
        let user = {
            userId,
            username,
            isCameraMuted
        }
        this.reduxStore.dispatch(actions.userJoined(user))
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
        this.reduxStore.dispatch(actions.meUserCreated(meUserId));
    }

    onUserSpeaking() {

    }

    onConferenceEnded() {

    }

    onTrackAdded(userId, track) {
        this.reduxStore.dispatch(actions.videoTrackAdded(userId, track.getId()))
    }

    onUserCameraMuted(userId, isMuted) {
        this.reduxStore.dispatch(actions.userCameraMuted(userId, isMuted));
    }

}