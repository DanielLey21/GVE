import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

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

export const setEmail = (email) => {
    return {
        type: AUTHENTICATION_SET_EMAIL,
        payload: email
    };
};

export const setPassword = (password) => {
    return {
        type: AUTHENTICATION_SET_PASSWORD,
        payload: password
    };
};

export const registerUser = (user, password) => {
    return (dispatch) => {
        dispatch({type: AUTHENTICATION_REGISTER_USER });
        firebase.auth().createUserWithEmailAndPassword(user.email, password)
            .then(() => registerUserSuccess(dispatch, user))
            .catch(function(error) {
                registerUserFail(dispatch, error);
            });
    };
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({type: AUTHENTICATION_LOGIN_USER})
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(function(error) {
                registerUserFail(dispatch, error);
            });
    }
}

const registerUserFail = (dispatch, error) => {
    dispatch({ 
        type: AUTHENTICATION_REGISTER_USER_FAIL,
        payload: error
     })
};

const registerUserSuccess = (dispatch, user) => {
    addUserToDatabase(dispatch, user);
    dispatch({
        type: AUTHENTICATION_REGISTER_USER_SUCCESS,
        payload: user
    });
};


const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: AUTHENTICATION_LOGIN_USER_SUCCESS,
        payload: user
    });
    dispatch(NavigationActions.navigate({routeName: 'ExchangeNavigation'}));
};

const addUserToDatabase = (dispatch, user) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
        .push(user)
        .then(() => {
            dispatch({ type: AUTHENTICATION_ADD_USER_SUCCESS, payload: user });
            dispatch(NavigationActions.navigate({routeName: 'AuthenticationMain'}));
        })
        .catch(error => {
            registerUserFail(dispatch, error);
        });
};