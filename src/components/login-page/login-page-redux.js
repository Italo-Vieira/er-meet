import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePage } from '../../redux/actions';
import LoginPage from './login-page-view'

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ changePage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
