import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const { 
    PROFILE_SET_PROFILE,
    PROFILE_UPDATE_USER_PROFILE,
    PROFILE_UPDATE_USER_PROFILE_SUCCESS,
    PROFILE_UPDATE_USER_PROFILE_FAIL,
    PROFILE_FETCH_USER_PROFILE,
    PROFILE_FETCH_USER_PROFILE_SUCCESS,
} = require('../resources/ActionConstants').default;



export const updateUserProfile = (user) => {
    return (dispatch) => {
        updateUserProfileOnDatabase(dispatch, user);
    }
};

export const updateProfileImage = (user) => {
    return (dispatch) => {
        Promise.all([uploadUserProfileImageToStorage(dispatch, user.profileImage.uri)]).then((urls) => {
            updateUserProfileOnDatabase(dispatch, { ...user, profileImage: urls[0] });
        }).catch(error => {
            // PUT ERROR FOR UPLOADING IMAGES
            // MAKE KANBAN USER STORY
        })
    }
};

export const fetchProfile = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({ type: PROFILE_FETCH_USER_PROFILE });
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
            .on('value', snapshot => {
                dispatch({ type: PROFILE_FETCH_USER_PROFILE_SUCCESS, payload: snapshot.val() });
                dispatch({ type: PROFILE_SET_PROFILE, payload: snapshot.val() })
            });
    };
};

// CREATE PROFILE TO PULL PICTURE DOWN

const uploadUserProfileImageToStorage = (dispatch, profileImageUri) => {
    // dispatch({
    //     type: PROFILE_SET_PROFILE,
    //     payload: user
    // });
    return new Promise((resolve, reject) => {
        const { currentUser } = firebase.auth();
        const uploadUri = (Platform.OS === 'ios' && !!profileImageUri) ? profileImageUri.replace('file://', '') : profileImageUri;
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        let downloadUrl = '';
        // create a reference in firebase storage
        const imageRef = firebase.storage().ref(currentUser.uid).child('profileImage');
        // encode image with base64 before uploading
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
            return Blob.build(data, { type: 'application/octet-stream;BASE64' })
        })
        // place the blob into your storage reference
        .then((blob) => {
            uploadBlob = blob;
            return imageRef.put(blob, { contentType: 'application/octet-stream' })
        })
        // from here you can get the download image url
        // to store the reference into our database
        .then(() => {
            uploadBlob.close();
            return imageRef.getDownloadURL();
        })
        .then((url) => {
            downloadUrl = url;
            fetchProfile();
            resolve({ downloadUrl, createdAt: sessionId });
        })
        .catch(error => {
            reject(error)
        })
    })
};

const updateUserProfileOnDatabase = (dispatch, user) => {
    const { currentUser } = firebase.auth();
    let userProfile = user; 
    dispatch({ type: PROFILE_UPDATE_USER_PROFILE });
    firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
        .update(userProfile)
        .then(() => {
            dispatch({ type: PROFILE_UPDATE_USER_PROFILE_SUCCESS });
            dispatch({ type: PROFILE_SET_PROFILE, payload: userProfile })
        })
        .catch(error => {
            console.warn(error);
            dispatch({ type: PROFILE_UPDATE_USER_PROFILE_FAIL, firebaseUpdateError: error });
        });
};