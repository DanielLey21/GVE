import React, { Component } from 'react';
import { 
  View, 
  Keyboard, 
  Alert,
  InteractionManager
} from 'react-native';
import { connect } from 'react-redux';

import { BackButtonHeader, InputField, PrimaryRedButton, Loader } from '../../common-components';
import theme from '../../styles/theme';
import { em } from '../../styles/styles';
import { setPassword, registerUser } from '../AuthenticationActions';
import User from '../../models/User';

class AuthenticationSignUpConfirmPassword extends Component {
    
  state = {
    confirmPassword: '', 
    confirmPasswordError: false, 
    confirmPasswordErrorMessage: "Your paswords don't match",
    firebaseError: undefined,
  }; 

  constructor(props) {
    super(props);

    this.onJoinButtonPress = this.onJoinButtonPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.firebaseError && !!nextProps.firebaseError.message) {
      
      this.setState({
        firebaseError: nextProps.firebaseError,
      });

      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          Alert.alert(
            'Registration Error', 
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

  onJoinButtonPress() {
    const isPasswordEmpty = this.state.confirmPassword.length === 0;
    this.setState({ confirmPasswordError: false })
    if (this._isConfirmPasswordValid() || isPasswordEmpty) {
      const { email } = this.props;
      Keyboard.dismiss()
      this.props.setPassword(this.state.confirmPassword);
      const user = { 
        email,
      }; 
      this.props.registerUser(new User(email), this.state.confirmPassword);
    } else {
      this.setState({ confirmPasswordError: true })
    }
  }

  _isConfirmPasswordValid() {
      return this.state.confirmPassword == this.props.password;
  }

  _displaySubtitleLabel() {
    if (this.state.confirmPasswordError) {
      return this.state.confirmPasswordErrorMessage;
    } else if (this.state.firebaseError) {
      return 'Please fix the errors';
    }

    return "To help you remember";
  }

  render() {
    const { backgroundContainer, inputContainer, buttonContainer } = styles
    const isPasswordEmpty = this.state.confirmPassword.length === 0;

    return (
      <View style={backgroundContainer}>
          <Loader
            loading={this.props.isLoading} />
          <BackButtonHeader onPress={this.onBackButtonPress.bind(this)} />
          
          <View style={inputContainer}>
            <InputField
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
              onSubmitEditing={this.onJoinButtonPress.bind(this)}
              placeholder="Re-enter your password"
              value={this.state.confirmPassword}
              label={this._displaySubtitleLabel()}
              showError={!!this.state.confirmPasswordError || !!this.state.firebaseError}
              secureTextEntry={true}
            />
          </View>

          <View style={isPasswordEmpty ? [buttonContainer, { opacity: 0.5 }] : buttonContainer}>
            <PrimaryRedButton 
              style={buttonContainer} 
              onPress={() => this.onJoinButtonPress()}>
                  Join the Great Vinyl Exchange
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
  inputContainer: {
    marginTop: em(4.75),
    flex: 1,
  },
  buttonContainer: {
    marginBottom: em(21),
    flex: 1,
  }
}

const mapStateToProps = ({ authentication }) => {
    const { email,
            password,
            firebaseError, 
            isLoading,
            isResponseSuccessful,
     } = authentication;
    return {
        email,
        password,
        firebaseError,
        isLoading,
        isResponseSuccessful,
    };
};

export default connect(mapStateToProps, { setPassword, registerUser })(AuthenticationSignUpConfirmPassword);