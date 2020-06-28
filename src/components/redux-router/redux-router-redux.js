import { connect } from 'react-redux';
import ReduxRouter from './redux-router-view'
import { getCurrentPage } from '../../redux/reducers'
import { routes } from './routes';
console.log(routes("login"))
const mapStateToProps = store => ({
    currentPage: getCurrentPage(store),
    routes, 
});


export default connect(mapStateToProps)(ReduxRouter);
