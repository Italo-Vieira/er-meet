import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { focusedUserChanged } from '../../redux/actions';
import ParticipantTile from './participant-tile-view'

const mapStateToProps = store => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ onClick: focusedUserChanged }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantTile);