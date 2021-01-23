import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getConferenceId } from '../../redux/reducers'
import { localUserNameChanged, preJoinCompleted } from '../../redux/actions';
import PreJoinPage from './pre-join-view'

const mapStateToProps = store => ({
    roomName: getConferenceId(store)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ localUserNameChanged, preJoinCompleted }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PreJoinPage);
