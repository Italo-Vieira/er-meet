import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions';
import ControlBar from './control-bar-view'

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ togglePartList: actions.partListToggled }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
