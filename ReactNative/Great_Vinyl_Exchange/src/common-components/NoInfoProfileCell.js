import React from 'react';
import { TextInput, View, Text } from 'react-native';

import theme from '../styles/theme';
import { Style, em } from '../styles/styles';

const NoInfoProfileCell = ({ title, value }) => {
    const { titleStyle, valueStyle } = styles;

    return (
        <View style={{ paddingTop: 20 }}>
            <Text style={titleStyle}>
                {title}
            </Text>
            <Text style={valueStyle}>
                {value}
            </Text>
        </View>
    );
};

const styles = {
    titleStyle: {
        fontSize: 14,
        fontFamily: "WorkSans-Regular",
        color: theme.gray,
        paddingBottom: 5,
    },
    valueStyle: {
        fontSize: 17,
        fontFamily: "WorkSans-Regular",
        color: theme.primaryRed,
    },
};

export { NoInfoProfileCell };