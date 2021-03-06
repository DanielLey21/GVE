import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const LinkButton = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: 17,
        paddingTop: 15,
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
    }
};

export { LinkButton };