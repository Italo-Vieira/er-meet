import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from '../../redux/actions';
import ConferencePageView from './conference-page-view'
import * as fromReducers from '../../redux/reducers'
import conferenceProvider from '../../conference'

function participants(store) {
    return fromReducers.getAllUsers(store)
                .filter(u => u.connected && u.videoTrack)
                .map(u => ({ username: u.username, key: u.userId, mute: u.mute, videoTrack: conferenceProvider.getTrack(u.videoTrack) }));
}

const mapStateToProps = store => ({
    newValue: store.clickState.newValue,
    participantList: participants(store),
    focusedUser: fromReducers.userStore.getFocusedUser(store),
    focusedTrack: conferenceProvider.getTrack(fromReducers.userStore.getFocusedUser(store)?.videoTrack)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ clickButton }, dispatch);

const ConferencePage = connect(mapStateToProps, mapDispatchToProps)(ConferencePageView);
export default ConferencePage; 