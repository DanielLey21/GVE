import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import theme from '../styles/theme';
import { Style, em } from '../styles/styles';


class ExchangeDetailScreen extends Component {
  
  render() {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ flex: 1 }}>
              Exchange Screen
          </Text>
        </View>
      );
    }
}

export default connect(null)(ExchangeDetailScreen);

