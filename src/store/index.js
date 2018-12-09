import {combineReducers} from 'redux';
import auth from './containers/auth/reducer'
import datagrip from './containers/datagrip/reducer'
import navigation from './containers/navigation/reducer'


export default combineReducers({
    auth: auth,
    datagrip: datagrip,
    navigation: navigation
});