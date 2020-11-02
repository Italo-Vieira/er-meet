import { connect } from 'react-redux';
import { userSelectors } from '../../redux/reducers'
import ParticipantList from './participant-list-view'
import * as fromActions from '../../redux/actions'
import { bindActionCreators } from 'redux';

const mapStateToProps = (store) => ({
        participantList: userSelectors.getConnectedUsers(store),
    });

const mapDispatchToProps = dispatch =>
    bindActionCreators({  muteUser: fromActions.muteUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);