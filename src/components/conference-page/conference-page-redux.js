import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from '../../redux/actions';
import ConferencePageView from './conference-page-view'

const mapStateToProps = store => ({
    newValue: store.clickState.newValue
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ clickButton }, dispatch);

const ConferencePage = connect(mapStateToProps, mapDispatchToProps)(ConferencePageView);
export default ConferencePage; 