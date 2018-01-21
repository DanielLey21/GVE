import React from 'react';
import { StackNavigator } from 'react-navigation';

import AuthenticationMain from '../authentication/screens/AuthenticationMain';
import AuthenticationSignUpEmail from '../authentication/screens/AuthenticationSignUpEmail';
import AuthenticationSignUpPassword from '../authentication/screens/AuthenticationSignUpPassword';
import AuthenticationSignUpConfirmPassword from '../authentication/screens/AuthenticationSignUpConfirmPassword';
import AuthenicationSignIn from '../authentication/screens/AuthenticationSignIn';

export default StackNavigator({
    AuthenticationMain: { screen: AuthenticationMain, navigationOptions: { header: null } },
    AuthenticationSignUpEmail: { screen: AuthenticationSignUpEmail, navigationOptions: { header: null } },
    AuthenticationSignUpPassword: { screen: AuthenticationSignUpPassword, navigationOptions: { header: null } },
    AuthenticationSignUpConfirmPassword: { screen: AuthenticationSignUpConfirmPassword, navigationOptions: { header: null } },
    AuthenicationSignIn: { screen: AuthenicationSignIn, navigationOptions: { header: null } }
});

