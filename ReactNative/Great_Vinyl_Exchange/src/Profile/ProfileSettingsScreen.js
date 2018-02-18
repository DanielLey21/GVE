import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import theme from '../styles/theme';
import { Style, em } from '../styles/styles';


class ProfileSettingsScreen extends Component {
  
  render() {
      return (
        <View>
          <Text style={{ flex: 1 }}>
              Exchange Screen
          </Text>
        </View>
      );
    }
}

export default connect(null)(ProfileSettingsScreen);