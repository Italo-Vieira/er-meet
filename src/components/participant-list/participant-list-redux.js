import { connect } from 'react-redux';
import * as fromReducers from '../../redux/reducers'
import * as fromActions from '../../redux/actions'
import ParticipantList from './participant-list-view'

function mapStateToProps(store) {
    return {
        participantList: fromReducers.getAllUsers(store).map(u => ({ username: u.username, key: u.userId, mute: u.mute })),
        muteUser: fromActions.muteUserPraValer
    }
};

export default connect(mapStateToProps)(ParticipantList);