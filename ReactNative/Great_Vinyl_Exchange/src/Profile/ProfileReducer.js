const { 
    PROFILE_SET_PROFILE,
    PROFILE_UPDATE_USER_PROFILE,
    PROFILE_UPDATE_USER_PROFILE_SUCCESS,
    PROFILE_UPDATE_USER_PROFILE_FAIL,
    PROFILE_FETCH_USER_PROFILE,
    PROFILE_FETCH_USER_PROFILE_SUCCESS,
    PROFILE_FETCH_USER_PROFILE_FAIL,
} = require('../resources/ActionConstants').default;

const INITIAL_STATE = { userProfile: {
                            name: undefined,
                            username: undefined, 
                            address: undefined,
                        },
                        isLoading: false,
                        firebaseError: undefined,
                     };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROFILE_SET_PROFILE:
            return { ...state, ...INITIAL_STATE, userProfile: action.payload };
        case PROFILE_UPDATE_USER_PROFILE:
            return { ...state, isLoading: true }; 
        case PROFILE_UPDATE_USER_PROFILE_SUCCESS:
            return { ...state, isLoading: false, isResponseComplete: true, userProfile: action.payload };
        case PROFILE_UPDATE_USER_PROFILE_FAIL: 
            return { ...state, isLoading: false, isResponseComplete: true, firebaseError: action.payload };
        case PROFILE_FETCH_USER_PROFILE: 
            return { ...state, isLoading: true }; 
        case PROFILE_FETCH_USER_PROFILE_SUCCESS:
            return { ...state, isLoading: false, isResponseComplete: true, userProfile: action.payload };
        case PROFILE_FETCH_USER_PROFILE_FAIL: 
            return { ...state, isLoading: false, isResponseComplete: true, firebaseError: action.payload };
        default:
            return state;
    }
};