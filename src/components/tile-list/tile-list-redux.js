import { connect } from 'react-redux';
import TileList from './tile-list-view'
import { userSelectors } from '../../redux/reducers'
import { bindActionCreators } from 'redux';
import { focusedUserChanged } from '../../redux/actions';

const mapStateToProps = store => ({
    participantList: userSelectors.getMediaUsers(store),
});


const mapDispatchToProps = dispatch =>
    bindActionCreators({ changeUserFocus: focusedUserChanged }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TileList);