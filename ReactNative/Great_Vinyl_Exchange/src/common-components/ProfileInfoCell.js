import React from 'react';
import { TextInput, View, Text } from 'react-native';

import theme from '../styles/theme';
import { Style, em } from '../styles/styles';

const ProfileInfoCell = ({ title, value, isEmpty }) => {
    const { titleStyle, valueStyle } = styles;

    return (
        <View style={{ paddingTop: 20 }}>
            <Text style={titleStyle}>
                {title}
            </Text>
            <Text style={[valueStyle, { color: isEmpty ? theme.primaryRed : theme.black}]}>
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
        fontSize: 19,
        lineHeight: 17,
        fontFamily: "WorkSans-Regular",
    },
};

export { ProfileInfoCell };