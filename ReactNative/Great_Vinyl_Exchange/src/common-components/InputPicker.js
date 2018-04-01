import React from 'react';
import { TextInput, View, Text, Item, Picker } from 'react-native';

import theme from '../styles/theme';
import { Style, em } from '../styles/styles';

var options =["Home","Savings","Car","GirlFriend"];

const InputPicker = ({ style, label, placeholder, value, onChangeText, showError, items = null }) => {
    const { inputStyle, labelStyle, errorLabelStyle, containerStyle } = styles;
    
    return(
        <View style={containerStyle}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={theme.gray}
                autoCorrect={false}
                style={[inputStyle, style]}
                value={value}
                onChangeText={onChangeText}
            />

            <Picker
                style={{}}
                mode="dropdown"
                selectedValue={this.state.selected}
                onValueChange={()=>{}}> 
                {options.map((item, index) => {
                    return (<Item label={item} value={index} key={index}/>) 
                })}
            </Picker>
            <Text style={showError ? errorLabelStyle : labelStyle}>{label}</Text>
        </View>
    );
};

const styles = {
    inputStyle: {
        flex: 1,
        color: theme.black,
        paddingBottom: 15,
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
        //flex: 1,
        color: theme.black,
        fontSize: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.0)'
    },
    errorLabelStyle: {
        //flex: 1,
        color: theme.primaryRed,
        fontSize: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.0)'
    },
    containerStyle: {
        flex: 1,
        marginBottom: 20,
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingBottom: 20,
    }
};

export { InputPicker };