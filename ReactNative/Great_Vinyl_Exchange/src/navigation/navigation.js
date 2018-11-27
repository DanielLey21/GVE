import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Text, TouchableOpacity } from 'react-native';

// Authentication Screens
import AuthenticationMain from '../Authentication/screens/AuthenticationMain';
import AuthenticationSignUpEmail from '../Authentication/screens/AuthenticationSignUpEmail';
import AuthenticationSignUpPassword from '../Authentication/screens/AuthenticationSignUpPassword';
import AuthenticationSignUpConfirmPassword from '../Authentication/screens/AuthenticationSignUpConfirmPassword';
import AuthenicationSignIn from '../Authentication/screens/AuthenticationSignIn';

import theme from '../styles/theme';

// Exchange
import ExchangeDetailScreen from '../Exchange/ExchangeDetailScreen';

// Profile Settings
import ProfileSettingsScreen from '../Profile/ProfileSettingsScreen';

const ExchangeStackNavigation = StackNavigator({
    ViewMatchupScreen: { 
        screen: ExchangeDetailScreen,
        navigationOptions: { 
            title: 'Exchange',
            headerStyle: { 
                backgroundColor: theme.primaryRed
            },
            headerTitleStyle: { 
                color: theme.cream, 
                fontFamily: 'WorkSans-SemiBold'
            },
         }
    }
});

const ProfileStackNavigation = StackNavigator({
    ViewMatchupScreen: { 
        screen: ProfileSettingsScreen, 
    }
});

export const ExchangeTabNavigation = TabNavigator({
    Exchange: { screen: ExchangeStackNavigation },
    Profile: { screen: ProfileStackNavigation },
}, {
    animationEnabled: true,
});

export const AuthenticationNavigation = StackNavigator({
    ExchangeDetailScreen: { screen: ExchangeDetailScreen, navigationOptions: { header: null } },
    AuthenticationMain: { screen: AuthenticationMain, navigationOptions: { header: null } },
    AuthenticationSignUpEmail: { screen: AuthenticationSignUpEmail, navigationOptions: { header: null } },
    AuthenticationSignUpPassword: { screen: AuthenticationSignUpPassword, navigationOptions: { header: null } },
    AuthenticationSignUpConfirmPassword: { screen: AuthenticationSignUpConfirmPassword, navigationOptions: { header: null } },
    AuthenicationSignIn: { screen: AuthenicationSignIn, navigationOptions: { header: null } },
    ExchangeTabNavigation: { screen: ExchangeTabNavigation, navigationOptions: { header: null } },
}, {
    initialRouteName: ExchangeDetailScreen,
});

