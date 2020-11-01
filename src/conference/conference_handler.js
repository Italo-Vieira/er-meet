import * as actions from '../redux/actions'

export default class ConferenceHandler {
    constructor(reduxStore) {
        this.reduxStore = reduxStore
    }

    onUserJoined(userId, username="Unnamed Maluco", mute=false) {
        // TODO: dispatch error if user id is undefined
        let user = {
            userId,
            username,
            mute
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
        this.reduxStore.dispatch(actions.changeUsername(userId, displayName))
    }

    onConferenceJoined() {

    }

    onUserSpeaking() {

    }

    onConferenceEnded() {

    }

    onTrackAdded(userId, track) {
        this.reduxStore.dispatch(actions.videoTrackAdded(userId, track.getId()))
    }

}