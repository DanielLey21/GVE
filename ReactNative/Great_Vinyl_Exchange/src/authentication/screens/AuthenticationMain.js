import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { PrimaryRedButton, Header } from '../../common-components';
import theme from '../../styles/theme';
import { Style, em } from '../../styles/styles';


class AuthenticationMain extends Component {

  constructor(props) {
    super();
    props.navigation.navigate('ExchangeTabNavigation');
  }

  onSignUpButtonPress() {
    this.props.navigation.navigate('AuthenticationSignUpEmail');
  }

  onSignInButtonPress() {
    this.props.navigation.navigate('AuthenicationSignIn');
  }
  
  render() {
      return (
        <View style={styles.backgroundContainer}>
          <View style={styles.viewContainer}>

             <View style={styles.logoImageContainer}>
              <Image 
                resizeMode="center"
                source={require('../../resources/images/GVElogo.png')} 
                style={styles.logoImage}
              />
            </View> 

             <View style={styles.buttonContainer}>
              <PrimaryRedButton
                  style={styles.buttonContainer} 
                  onPress={this.onSignUpButtonPress.bind(this)}>
                      SignUp  
              </PrimaryRedButton>
            </View>

            <View style={styles.signInTextContainer}>
              <Text style={styles.signInPrimaryText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={this.onSignInButtonPress.bind(this)}>
                <Text style={styles.signInSecondaryText}>Sign in</Text>
              </TouchableOpacity>
            </View>   

          </View>
        </View>
      );
    }
}

const styles = {
  backgroundContainer: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignItems: 'center',
    backgroundColor: theme.cream,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: Style.DEVICE_HEIGHT * 0.80
  },
  logoImageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logoImage: {
    flex: 1
  },
  signInTextContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: em(4),
    marginBottom: em(1),
  },
  signInPrimaryText: {
    color: '#454651'
  },
  signInSecondaryText: {
    color: theme.primaryRed
  }
};

export default connect(null)(AuthenticationMain);

