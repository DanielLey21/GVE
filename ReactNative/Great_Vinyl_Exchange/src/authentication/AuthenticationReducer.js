const { 
    AUTHENTICATION_SET_EMAIL,
    AUTHENTICATION_SET_PASSWORD, 
    AUTHENTICATION_REGISTER_USER,
    AUTHENTICATION_REGISTER_USER_SUCCESS, 
    AUTHENTICATION_REGISTER_USER_FAIL,
    AUTHENTICATION_ADD_USER_SUCCESS,
    AUTHENTICATION_LOGIN_USER,
    AUTHENTICATION_LOGIN_USER_SUCCESS,
} = require('../resources/ActionConstants').default;

const INITIAL_STATE = { email: '',
                        password: '', 
                        user: null,
                        userProfile: null,
                        isLoading: false,
                        firebaseError: undefined,
                     };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTHENTICATION_SET_EMAIL:
            return { ...state, ...INITIAL_STATE, email: action.payload };
        case AUTHENTICATION_SET_PASSWORD:
            return { ...state, password: action.payload };
        case AUTHENTICATION_REGISTER_USER:
            return { ...state, isLoading: true }; 
        case AUTHENTICATION_REGISTER_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case AUTHENTICATION_REGISTER_USER_FAIL: 
            return { ...state, isLoading: false, isResponseComplete: true, firebaseError: action.payload };
        case AUTHENTICATION_ADD_USER_SUCCESS:
            return { ...state, isLoading: false, isResponseComplete: true, userProfile: action.payload };
        case AUTHENTICATION_LOGIN_USER: 
            return { ...state, isLoading: true }; 
        case AUTHENTICATION_LOGIN_USER_SUCCESS:
            return { ...state, isLoading: false, isResponseComplete: true, user: action.payload };
        default:
            return state;
    }
};