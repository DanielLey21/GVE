import React, { Component } from 'react';
import { 
  View,
  Alert,
  InteractionManager
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators }from 'redux'; 

import { BackButtonHeader, InputField, PrimaryRedButton, Loader } from '../../common-components';
import theme from '../../styles/theme';
import { em } from '../../styles/styles';
import * as authenticationActions from '../AuthenticationActions';

const mapDispatchToProps = dispatch => ({
  authenticationActions: bindActionCreators(authenticationActions, dispatch),
});

const mapStateToProps = ({ authentication }) => {
    const { 
        firebaseError, 
        isLoading,
     } = authentication;
    return {
        firebaseError,
        isLoading,
    };
};

class AuthenticationSignIn extends Component {
    
  state = {
    email: '',
    password: '',
    isLoading: false,
  }; 

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.firebaseError && this.props.firebaseError !== nextProps.firebaseError) {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
            Alert.alert(
              'Login Error', 
              nextProps.firebaseError.message,
              [
                {text: 'Ok'},
              ]
            );
        });
      });
    }
  }

  onBackButtonPress() {
    this.props.navigation.goBack();
  }

  _onSignInPressed() {
    const { email, password } = this.state;
    this.props.authenticationActions.loginUser(email, password);
  }

  _displayError() {
    let emailError = { showError: false, message: '' };
    let passwordError = { showError: false, message: '' };
    const { firebaseError } = this.state;
    if (firebaseError !== undefined && firebaseError !== null) {
        switch (firebaseError.code) {
            case "auth/user-not-found":
            case "auth/invalid-email":
                emailError = { showError: true, message: 'Please enter a valid email address'};
                break;
            case "auth/wrong-password":
                passwordError = { showError: true, message: 'Incorrect password'};
                break;
            default:
                break;
        }
    }
    
    return { emailError, passwordError}
  }

  render() {
    const { backgroundContainer, emailContainer, passwordContainer, buttonContainer } = styles;
    const { emailError, passwordError } = this._displayError();
    const areFieldsEmpty = this.state.email.length === 0 || this.state.password.length === 0;

    return (
      <View style={backgroundContainer}>
          {this.props.isLoading && <Loader />}
          
          <BackButtonHeader onPress={this.onBackButtonPress.bind(this)} />
          
          <View style={emailContainer}>
            <InputField 
              onChangeText={email => this.setState({ email })}
              onSubmitEditing={null}
              placeholder='Email'
              value={this.state.email}
              label={`${emailError.message}`}
              showError={emailError.showError}
            />
          </View>

          <View style={passwordContainer}>
            <InputField 
              onChangeText={password => this.setState({ password })}
              onSubmitEditing={this._onSignInPressed.bind(this)}
              placeholder='Password'
              value={this.state.password}
              label={`${passwordError.message}`}
              showError={passwordError.showError}
              secureTextEntry={true}
            />
          </View>

          <View style={areFieldsEmpty ? [buttonContainer, { opacity: 0.5 }] : buttonContainer}>
            <PrimaryRedButton 
              style={buttonContainer} 
              onPress={!areFieldsEmpty && this._onSignInPressed.bind(this)}>
                  Sign into the Great Vinyl Exchange
            </PrimaryRedButton>
          </View>  
      </View>
    );
  }
}

const styles = {
  backgroundContainer: {
    flex: 1,
    backgroundColor: theme.cream,
    width: undefined,
    height: undefined,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailContainer: {
    marginTop: em(4.75),
    flex: 1,
  },
  passwordContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: em(21),
    flex: 1,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationSignIn);