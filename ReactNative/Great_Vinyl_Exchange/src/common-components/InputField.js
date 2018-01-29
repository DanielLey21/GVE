import React from 'react';
import { TextInput, View, Text } from 'react-native';

import theme from '../styles/theme';
import { Style, em } from '../styles/styles';

const InputField = ({ label, placeholder, secureTextEntry = false, value, onChangeText, onSubmitEditing, showError, multiline = false }) => {
    const { inputStyle, labelStyle, errorLabelStyle, containerStyle } = styles;

    return(
        <View style={containerStyle}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor={theme.black}
                autoCorrect={false}
                style={value.length == 0 ? [inputStyle, inputStyle] : inputStyle}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                multiline={multiline}
            />
            <Text style={showError ? errorLabelStyle : labelStyle}>{label}</Text>
        </View>
    );
};

const styles = {
    inputStyle: {
        color: theme.black,
        paddingBottom: em(.4),
        marginBottom: em(.25),
        fontSize: 16,
        lineHeight: 23,
        width: Style.DEVICE_WIDTH * 0.90,
        alignSelf: 'flex-start',
        borderBottomWidth: 2,
        borderBottomColor: theme.black,
    },
    labelStyle: {
        flex: 1,
        color: theme.black,
        fontSize: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.0)'
    },
    errorLabelStyle: {
        flex: 1,
        color: theme.primaryRed,
        fontSize: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.0)'
    },
    containerStyle: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
};

export { InputField };