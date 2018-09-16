import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication/AuthenticationReducer';
import ProfileReducer from './Profile/ProfileReducer'
import NavigationReducer from './navigation/NavigationReducer';

export default combineReducers({
    authentication: AuthenticationReducer,
    profile: ProfileReducer,
    nav: NavigationReducer,
});