// Import libraries for making a component
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';

import theme from '../styles/theme';


const BackButtonHeader = ({ onPress }) => {
    const { viewStyle, backButtonStyle } = styles;

    return (
        <View style={viewStyle}>
            <TouchableOpacity onPress={onPress}>
                <Image 
                    source={require('../resources/images/back-arrow_black.png')} 
                    style={backButtonStyle}
                    resizeMode='contain'
                    />
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    viewStyle: {
        alignSelf: 'flex-start', 
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: undefined,
        padding: 15,
        paddingTop: 25,
        elevation: 2,
    },
    backButtonStyle: {
        width: 30,
        height: 30,
    }
};

export { BackButtonHeader };