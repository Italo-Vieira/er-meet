import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions';
import ControlBar from './control-bar-view'
import { userSelectors } from '../../../redux/reducers'

const mapStateToProps = store => ({
    meUser: userSelectors.getMeUser(store)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ togglePartList: actions.partListToggled }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
