import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { ProfileInfoCell, InputField } from '../common-components';
import theme from '../styles/theme';
import { Style, em } from '../styles/styles';

class ProfileSettingsScreen extends Component {

    state = {
        name: '',
        address: '',
        username: '', 
        city: '',
        state: '',
        zipcode: '',
        //profile: {username: 'deej21', name: 'DJ', address: '1943 N. Fremont st.', city: 'Chicago', state: 'IL', zipcode: '60614'},
        isEditing: false,
    }; 

    static navigationOptions = ({ navigation }) => { 
        const { headerRight } = !!navigation.state.params ? navigation.state.params : navigation.state;
        return {
            title: 'Settings',
            headerStyle: { backgroundColor: theme.primaryRed },
            headerTitleStyle: { color: theme.cream, fontFamily: 'WorkSans-SemiBold' },
            headerRight: !!headerRight && headerRight,
        };
    };

    constructor(props) {
        super(props)

        this._onProfileFormTapped = this._onProfileFormTapped.bind(this);
    }

    componentWillMount() {
        this.props.navigation.setParams(
            { headerRight: <TouchableOpacity
                            onPress={this._onProfileFormTapped}
                           >
                                <Text
                                    style={{ paddingRight: 17,
                                            color: theme.cream,
                                            fontSize: 17,
                                            fontFamily: 'WorkSans-Regular'
                                        }}
                                >Edit</Text>
                           </TouchableOpacity>
        });
    }

    _onProfileFormTapped() {
        if (this.state.isEditing) {
            this.props.navigation.setParams(
            {
                headerRight: <TouchableOpacity
                                onPress={this._onProfileFormTapped}  
                             >
                                <Text
                                    style={{ paddingRight: 17,
                                            color: theme.cream,
                                            fontSize: 17,
                                            fontFamily: 'WorkSans-Regular'
                                        }}
                                >Edit</Text>
                            </TouchableOpacity>
            });
        } else {
            this.props.navigation.setParams(
            {
                headerRight: <TouchableOpacity
                               onPress={this._onProfileFormTapped}
                             >
                                <Text
                                    style={{ paddingRight: 17,
                                            color: theme.cream,
                                            fontSize: 17,
                                            fontFamily: 'WorkSans-Regular'
                                        }}
                                >Done</Text>
                           </TouchableOpacity>
            });
        }
        this.setState({ isEditing: !this.state.isEditing });
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
            <TouchableWithoutFeedback onPress={this._onProfileFormTapped}>
                <View style={{ paddingLeft: 21, paddingTop: 5 }}>
                    <ProfileInfoCell 
                        title="Name"
                        value="Add Name"
                        isEmpty={true} />
                    <ProfileInfoCell 
                        title="Preferred Shipping Address"
                        value="Add Address"
                        isEmpty={true} />
                    <ProfileInfoCell 
                        title="Discogs Username"
                        value="Add Username"
                        isEmpty={true} />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderEditProfileView() {
        return (
            <View style={{ paddingHorizontal: 21, paddingTop: 10, justifyContent: 'flex-start', flexDirection: 'column' }}>
                <InputField
                    onChangeText={name => this.setState({ name })}
                    onSubmitEditing={null}
                    placeholder={"Add Name"}
                    value={this.state.name}
                    label={"Full Name"}
                    showError={false}
                />
                 <InputField
                    style={{ flex: 1 }}
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
                        <InputField
                            style={{ flex: 1, width: '100%'}}
                            onChangeText={state => this.setState({ state })}
                            onSubmitEditing={null}
                            placeholder={"Add State"}
                            value={this.state.state}
                            label={"State (Abbr.)"}
                            showError={false}
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
                        keyboardType='numeric'
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

    _renderProfileView() {
        return (
            <View style={{ paddingLeft: 21, paddingTop: 5 }}>
                <ProfileInfoCell 
                    title="Name"
                    value={this.state.profile.name}
                    isEmpty={false} />
                <ProfileInfoCell 
                    title="Preferred Shipping Address"
                    value={`${this.state.profile.address}
                            \n${this.state.profile.city},  ${this.state.profile.state},  ${this.state.profile.zipcode}`}
                    isEmpty={false} />
                <ProfileInfoCell 
                    title="Discogs Username"
                    value={this.state.profile.username}
                    isEmpty={false} />
            </View>
        );
    }
  
    render() {
        let renderForm = null;
        if (_.isEmpty(this.state.profile) && !this.state.isEditing) {
            {/*If no information, load no info cells  */}
            renderForm = this._renderNoInformationProvidedView();
        } else if (this.state.isEditing) {
            {/*If User is editing, render editing cells  */}
            renderForm = this._renderEditProfileView();
        } else {
            {/*If information, and not editing, render info cells  */}
            renderForm = this._renderProfileView();
        }
        return (
            <View style={{ flex: 1, backgroundColor: theme.cream }}>
                {this._renderTitle()}
                {this._renderProfileImage()}
                {renderForm} 
            </View>
        );
    }
}

export default connect(null)(ProfileSettingsScreen);