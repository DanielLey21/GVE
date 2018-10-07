import React from 'react';
import { TextInput, View, Text } from 'react-native';

import theme from '../styles/theme';
import { Style, em } from '../styles/styles';

const InputField = ({ style, label, placeholder, secureTextEntry = false, value, onChangeText, onSubmitEditing, showError, keyboardType = 'default', multiline = false, editable = true }) => {
    const { inputStyle, labelStyle, errorLabelStyle, containerStyle } = styles;
    
    return(
        <View style={containerStyle}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor={theme.gray}
                autoCorrect={false}
                style={[inputStyle, style]}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                multiline={multiline}
                editable={editable}
                keyboardType={keyboardType}
            />
            <Text style={showError ? errorLabelStyle : labelStyle}>{label}</Text>
        </View>
    );
};

const styles = {
    inputStyle: {
        flex: 1,
        color: theme.black,
        paddingBottom: 5,
        marginBottom: 2,
        paddingTop: 10,
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
        //flex: 1,
        height: 95,
        //marginBottom: 20,
        //marginTop: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        //paddingBottom: 5,
    }
};

export { InputField };