import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { NoInfoProfileCell, InputField, PickerTest } from '../common-components';
import theme from '../styles/theme';
import { Style, em } from '../styles/styles';

const states = [
    {
        inputLabel: 'hello',
        pickerValue: 'yes its me',
    },
    {
        inputLabel: 'Nah',
        pickerValue: 'yes its me',
    }
]

class ProfileSettingsScreen extends Component {

    state = {
        name: '',
        address: '',
        username: '', 
        city: '',
        state: '',
        zipcode: '',
        stateSelectedIndex: undefined,
        stateSelectedValue: undefined,
    }; 

    static navigationOptions = ({ 
        title: 'Settings',
        headerStyle: { backgroundColor: theme.primaryRed },
        headerTitleStyle: { color: theme.cream, fontFamily: 'WorkSans-SemiBold' },
        headerRight: <TouchableOpacity>
                        <Text
                            style={{ paddingRight: 17,
                                     color: theme.cream,
                                     fontSize: 17,
                                     fontFamily: 'WorkSans-Regular'
                                  }}
                        >Edit</Text>
                    </TouchableOpacity>
    });

    constructor() {
        super()
    }

    _renderTitle() {
        return (
            <Text
                style={{ 
                    fontSize: 22, 
                    color: theme.primaryRed, 
                    paddingLeft: 16, 
                    paddingTop: 20,
                    fontWeight: '500',
                    fontFamily: 'WorkSans-SemiBold' }}
            >
                Profile
            </Text>
        );
    }

    _renderProfileImage() {
        return (
            <View
              style={{ paddingTop: 20, paddingLeft: 16 }}>
                <Image 
                resizeMode="contain"
                style={{ width: 72, height: 72 }}
                source={require('../resources/images/avatar-default.png')} 
              />
            </View>
        )
    }

    _renderNoInformationProvidedView() {
        return (
            <View style={{ paddingLeft: 21, paddingTop: 5 }}>
                <NoInfoProfileCell 
                    title="Name"
                    value="Add Name" />
                <NoInfoProfileCell 
                    title="Preferred Shipping Address"
                    value="Add Address" />
                <NoInfoProfileCell 
                    title="Discogs Username"
                    value="Add Username" />
            </View>
        );
    }

    _renderEditProfileView() {
        return (
            <View style={{ paddingHorizontal: 21, paddingTop: 10 }}>
                <InputField
                    onChangeText={name => this.setState({ name })}
                    onSubmitEditing={null}
                    placeholder={"Add Name"}
                    value={this.state.name}
                    label={"Full Name"}
                    showError={false}
                />
                <InputField
                    onChangeText={address => this.setState({ address })}
                    onSubmitEditing={null}
                    placeholder={"Add Address"}
                    value={this.state.address}
                    label={"Preferred Shipping Address"}
                    showError={false}
                />
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <InputField
                            style={{ flex: 1, width: '100%'}}
                            onChangeText={city => this.setState({ city })}
                            onSubmitEditing={null}
                            placeholder={"Add City"}
                            value={this.state.city}
                            label={"City"}
                            showError={false}
                        />
                    </View>
                    <View style={{ paddingLeft: 18 }}>
                    <PickerTest
                        style={{ flex: 1, width: '110%'}}
                        placeholder={"Add State"}
                        label={"State"}
                        showError={false}
                        onValueChange={(value, index) => {
                            this.setState({
                            stateSelectedIndex: index,
                            stateSelectedValue: value,
                            });
                        }}
                        items={states}
                    />
                    </View>
                    <View style={{ paddingLeft: 25 }}>
                    <InputField
                        style={{ flex: 1, width: '100%'}}
                        onChangeText={zipcode => this.setState({ zipcode })}
                        onSubmitEditing={null}
                        placeholder={"Add ZIP"}
                        value={this.state.zipcode}
                        label={"ZIP code"}
                        showError={false}
                    /> 
                    </View>
                </View>
                <InputField
                    onChangeText={username => this.setState({ username })}
                    onSubmitEditing={null}
                    placeholder={"Add Username"}
                    value={this.state.username}
                    label={"Discogs Username"}
                    showError={false}
                />
            </View>
        );
    }
  
    render() {
        return (
        <View style={{ flex: 1, backgroundColor: theme.cream }}>
            {this._renderTitle()}
            {this._renderProfileImage()}
            {/*If no information, load no info cells  */}
            {/* {this._renderNoInformationProvidedView()} */}
            {/*If User is editing, render editing cells  */}
            {this._renderEditProfileView()}
            {/*If information, and not editing, render info cells  */}
        </View>
        );
    }
}

export default connect(null)(ProfileSettingsScreen);