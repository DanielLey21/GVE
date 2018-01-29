import React, { Component } from 'react';
import { 
  View, 
  Keyboard, 
  Alert
} from 'react-native';
import { connect } from 'react-redux';

import { BackButtonHeader, InputField, PrimaryRedButton, Spinner } from '../../common-components';
import theme from '../../styles/theme';
import { em } from '../../styles/styles';
import { setPassword, registerUser } from '../AuthenticationActions';
import User from '../../models/User';

class AuthenticationSignUpConfirmPassword extends Component {
    
  state = {
    confirmPassword: '', 
    confirmPasswordError: false, 
    confirmPasswordErrorMessage: "Your paswords don't match",
    firebaseError: this.props.firebaseError,
  }; 

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.firebaseError !== null) {
      this.setState({
        firebaseError: nextProps.firebaseError,
      });
    }
  }

  onBackButtonPress() {
    this.props.navigation.goBack();
  }

  onJoinButtonPress() {
    this.setState({ confirmPasswordError: false })
    if (this._isConfirmPasswordValid()) {
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

  _renderAuthenticationAlertMessage() {
    const { firebaseError } = this.props;
    return Alert.alert(firebaseError.message);
  }

  _renderSpinner() {
    return (<Spinner size="large" />);
  }

  render() {
    const { backgroundContainer, inputContainer, buttonContainer } = styles
    const isPasswordEmpty = this.state.confirmPassword.length === 0;

    if (this.props.isLoading) {
      return (
        <View style={backgroundContainer}>
          <View>
            {this.props.isLoading && this._renderSpinner()}
          </View>
        </View>
      );
    }

    return (
      <View style={backgroundContainer}>
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

          <View>
            {this.props.isLoading && this._renderSpinner()}
          </View>

          <View style={isPasswordEmpty ? [buttonContainer, { opacity: 0.5 }] : buttonContainer}>
            <PrimaryRedButton 
              style={buttonContainer} 
              onPress={!isPasswordEmpty && this.onJoinButtonPress.bind(this)}>
                  Join the Great Vinyl Exchange
            </PrimaryRedButton>
          </View>  

          <View>
            {this.state.firebaseError && this._renderAuthenticationAlertMessage()}
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