import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { OrangeButton } from '../../common-components';
import { Style, em } from '../../styles/styles';


class AuthenticationMain extends Component {

  onSignUpButtonPress() {
    this.props.navigation.navigate('AuthenticationSignUpEmail');
  }

  onSignInButtonPress() {
    this.props.navigation.navigate('AuthenicationSignIn');
  }
  
  render() {
      return (
        <ImageBackground source={require('../../resources/images/authentication_bg.jpg')} style={styles.backgroundImageContainer}>
          <View style={styles.viewContainer}>

            <View style={styles.logoImageContainer}>
              <Image source={require('../../resources/images/gve_logo.png')} style={styles.logoImage} />
            </View>

            <View style={styles.titleLabelContainer}>
              <Text style={styles.titleLabel}>THE GREAT</Text>
              <Text style={styles.titleLabel}>VINYL</Text>
              <Text style={styles.titleLabel}>EXCHANGE</Text>
            </View>

            <OrangeButton
                style={styles.buttonContainer} 
                onPress={this.onSignUpButtonPress.bind(this)}>
                    SignUp  
            </OrangeButton>

            <View style={styles.signInTextContainer}>
              <Text style={styles.signInPrimaryText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={this.onSignInButtonPress.bind(this)}>
                <Text style={styles.signInSecondaryText}>Sign in</Text>
              </TouchableOpacity>
            </View>

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
    opacity: .9,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: Style.DEVICE_HEIGHT * 0.80
  },
  logoImageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: em(5),
    marginBottom: em(12)
  },
  logoImage: {
    resizeMode: 'contain',
    width: 223,
    height: 198,
  },
  titleLabelContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: em(11),
  },
  titleLabel: {
    fontSize: 40,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontWeight: '400'
  },
  buttonContainer: {
    flex: 1,
    width: null,
  },
  signInTextContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: em(4),
  },
  signInPrimaryText: {
    color: '#454651'
  },
  signInSecondaryText: {
    color: '#ffffff'
  }
};

export default connect(null)(AuthenticationMain);

