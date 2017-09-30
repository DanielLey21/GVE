import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const OrangeButton = ({ onPress, children }) => {
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
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 15,
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fc8802',
        borderRadius: 25,
        height: 50,
        width: 340
    }
};

export { OrangeButton };