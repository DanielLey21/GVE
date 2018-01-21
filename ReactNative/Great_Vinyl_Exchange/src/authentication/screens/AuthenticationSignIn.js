import React, { Component } from 'react';
import { 
  View, 
  ImageBackground, 
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators }from 'redux'; 

import { BackButtonHeader, InputField, OrangeButton, Spinner } from '../../common-components';
import { em } from '../../styles/styles';
import * as authenticationActions from '../AuthenticationActions';
import User from '../../models/User';

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
    firebaseError: this.props.firebaseError,
    showErrorModal: false,
  }; 

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.firebaseError !== this.props.firebaseError) {
        this.setState({ firebaseError: nextProps.firebaseError, showErrorModal: true });
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

  _renderAuthenticationAlertMessage() {
    const { firebaseError } = this.props;
    this.setState({ showErrorModal: false });
    return Alert.alert(firebaseError.message);
  }

  _renderSpinner() {
    return (<Spinner size="large" />);
  }

  render() {
    const { backgroundImageContainer, emailContainer, passwordContainer, buttonContainer } = styles;
    if (this.props.isLoading) {
      return (
        <ImageBackground source={require('../../resources/images/authentication_bg.jpg')} style={backgroundImageContainer}>
          <View>
            {this.props.isLoading && this._renderSpinner()}
          </View>
        </ImageBackground>
      );
    }

    const { emailError, passwordError } = this._displayError();

    return (
      <ImageBackground source={require('../../resources/images/authentication_bg.jpg')} style={backgroundImageContainer}>
          <BackButtonHeader onPress={this.onBackButtonPress.bind(this)} />
          
          <View style={emailContainer}>
            <InputField 
              onChangeText={email => this.setState({ email })}
              onSubmitEditing={null}
              placeholder="Email"
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

          <View>
            {this.props.isLoading && this._renderSpinner()}
          </View>

          <View style={buttonContainer}>
            <OrangeButton 
              style={buttonContainer} 
              onPress={this._onSignInPressed.bind(this)}>
                  Sign into the Great Vinyl Exchange
            </OrangeButton>
          </View>  

          <View>
             {this.state.showErrorModal && this._renderAuthenticationAlertMessage()} 
          </View>
      </ImageBackground>
    );
  }
}

const styles = {
  backgroundImageContainer: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: .8,
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