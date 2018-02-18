import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

// Authentication Screens
import AuthenticationMain from '../authentication/screens/AuthenticationMain';
import AuthenticationSignUpEmail from '../authentication/screens/AuthenticationSignUpEmail';
import AuthenticationSignUpPassword from '../authentication/screens/AuthenticationSignUpPassword';
import AuthenticationSignUpConfirmPassword from '../authentication/screens/AuthenticationSignUpConfirmPassword';
import AuthenicationSignIn from '../authentication/screens/AuthenticationSignIn';

// Exchange
import ExchangeDetailScreen from '../Exchange/ExchangeDetailScreen';

// Profile Settings
import ProfileSettingsScreen from '../Profile/ProfileSettingsScreen';

export const ExchangeNavigation = TabNavigator({
    Exchange: { screen: ExchangeDetailScreen },
    Profile: { screen: ProfileSettingsScreen },
}, {
    animationEnabled: true,
});

export const AuthenticationNavigation = StackNavigator({
    AuthenticationMain: { screen: AuthenticationMain, navigationOptions: { header: null } },
    AuthenticationSignUpEmail: { screen: AuthenticationSignUpEmail, navigationOptions: { header: null } },
    AuthenticationSignUpPassword: { screen: AuthenticationSignUpPassword, navigationOptions: { header: null } },
    AuthenticationSignUpConfirmPassword: { screen: AuthenticationSignUpConfirmPassword, navigationOptions: { header: null } },
    AuthenicationSignIn: { screen: AuthenicationSignIn, navigationOptions: { header: null } },
    ExchangeNavigation: {screen: ExchangeNavigation, navigationOptions: { header: null } }
}, {
    initialRouteName: 'AuthenticationMain'
});

