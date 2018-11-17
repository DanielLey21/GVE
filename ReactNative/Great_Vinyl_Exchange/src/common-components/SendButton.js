import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import theme from '../styles/theme';
import { Style, em } from '../styles/styles';

const SendButton = ({ activeText, inActiveText, isActive, onPress }) => {
    const { inActiveTitleStyle, valueStyle, activeTitleStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: isActive ? theme.cream : theme.primaryRed, paddingVertical: 3, paddingHorizontal: 20, borderColor: theme.cream, borderWidth: 1, borderRadius: 15, width: 125 }}>
            <View>
                <Text style={isActive ? activeTitleStyle: inActiveTitleStyle}>
                    {isActive ? activeText : inActiveText}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    inActiveTitleStyle: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: "WorkSans-Regular",
        color: theme.cream,
        paddingBottom: 5,
        paddingTop: 5,
        alignSelf: 'center',
    },
    activeTitleStyle: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: "WorkSans-Regular",
        color: theme.primaryRed,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: theme.cream,
        alignSelf: 'center',
    },
    valueStyle: {
        fontSize: 19,
        lineHeight: 17,
        fontFamily: "WorkSans-Regular",
    },
};

export { SendButton };