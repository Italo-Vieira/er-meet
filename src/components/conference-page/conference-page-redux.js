import { connect } from 'react-redux';
import ConferencePageView from './conference-page-view'
import {userSelectors} from '../../redux/reducers'
import { bindActionCreators } from 'redux';
import { focusedUserChanged } from '../../redux/actions';

const mapStateToProps = store => ({
    participantList: userSelectors.getMediaUsers(store),
    focusedUser: userSelectors.getFocusedMediaUser(store),
});


const mapDispatchToProps = dispatch =>
    bindActionCreators({ changeUserFocus: focusedUserChanged }, dispatch);

const ConferencePage = connect(mapStateToProps, mapDispatchToProps)(ConferencePageView);
export default ConferencePage; 