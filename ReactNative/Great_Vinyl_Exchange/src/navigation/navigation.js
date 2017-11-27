import React from 'react';
import { StackNavigator } from 'react-navigation';

import AuthenticationMain from '../authentication/screens/AuthenticationMain';
import AuthenticationSignUpEmail from '../authentication/screens/AuthenticationSignUpEmail';
import AuthenticationSignUpUsername from '../authentication/screens/AuthenticationSignUpUsername';
import AuthenticationSignUpAddress from '../authentication/screens/AuthenticationSignUpAddress';
import AuthenticationSignUpPassword from '../authentication/screens/AuthenticationSignUpPassword';
import AuthenticationSignUpConfirmPassword from '../authentication/screens/AuthenticationSignUpConfirmPassword';

export default StackNavigator({
    AuthenticationMain: { screen: AuthenticationMain, navigationOptions: { header: null } },
    AuthenticationSignUpEmail: { screen: AuthenticationSignUpEmail, navigationOptions: { header: null } },
    AuthenticationSignUpUsername: { screen: AuthenticationSignUpUsername, navigationOptions: { header: null } },
    AuthenticationSignUpAddress: { screen: AuthenticationSignUpAddress, navigationOptions: { header: null } },
    AuthenticationSignUpPassword: { screen: AuthenticationSignUpPassword, navigationOptions: { header: null } },
    AuthenticationSignUpConfirmPassword: { screen: AuthenticationSignUpConfirmPassword, navigationOptions: { header: null } }
});

