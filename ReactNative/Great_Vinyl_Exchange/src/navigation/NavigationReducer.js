import { AuthenticationNavigation } from '../navigation/navigation';

const initialState = AuthenticationNavigation.router.getStateForAction(AuthenticationNavigation.router.getActionForPathAndParams('AuthenticationMain'));

export default (state = initialState, action) => {
    const newState = AuthenticationNavigation.router.getStateForAction(action, state);
    return newState || state;
};