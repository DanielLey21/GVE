// Import libraries for making a component
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import theme from '../styles/theme';

// Make a component
const Header = (props) => {
    const { titleStyle, viewStyle, rightTextStyle, leftTextStyle } = styles;

    return (
        <View style={viewStyle}>  
            <Text
                style={leftTextStyle}
                onPress={props.leftAction}
            >
                {!!props.leftText ? props.leftText : ''}
            </Text>
            <Text style={titleStyle}>{props.headerText}</Text>
            <Text
                style={rightTextStyle}
                onPress={props.rightAction}
            >
                {!!props.rightText ? props.rightText : ''}
            </Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'baseline',
        backgroundColor: theme.primaryRed,
        height: 60,
        //justifyContent: 'space-between',
        //paddingBottom: 10,
        paddingTop: 30,
        // // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // elevation: 2,
        left: 0,
        right: 0,
        //top: 0,
        //position: 'absolute'
    },
    leftTextStyle: {
        flex: 1,
        fontSize: 17,
        color: theme.cream,
        //alignSelf: 'flex-start',
        paddingHorizontal: 10,
    },
    titleStyle: {
        flex: 1,
        fontSize: 17,
        color: theme.cream,
        fontWeight: '600',
        //alignSelf: 'center',
    },
    rightTextStyle: {
        flex: 1,
        fontSize: 17,
        color: theme.cream,
        //alignSelf: 'flex-end',
        paddingHorizontal: 10,
    }
};

// Make the component available to other parts of the app
export { Header };
