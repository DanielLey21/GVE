import { combineReducers } from 'redux';
import AuthenticationReducer from './Authentication/AuthenticationReducer';
import ProfileReducer from './Profile/ProfileReducer'
import NavigationReducer from './navigation/NavigationReducer';

export default combineReducers({
    authentication: AuthenticationReducer,
    profile: ProfileReducer,
    nav: NavigationReducer,
});