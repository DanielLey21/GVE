import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import theme from '../styles/theme';
import { Style, em } from '../styles/styles';
import { SendButton } from '../common-components';
import { generateMatchups } from './ExchangeUtils';


class ExchangeDetailScreen extends Component {

  state = {
    recordHasBeenSent: false,
    isAdmin: false,
  }; 

  static navigationOptions = ({ navigation }) => { 
        const { headerRight } = !!navigation.state.params ? navigation.state.params : navigation.state;
        return {
            title: 'Exchange',
            headerStyle: { backgroundColor: theme.primaryRed },
            headerTitleStyle: { color: theme.cream, fontFamily: 'WorkSans-SemiBold' },
            headerRight: !!headerRight && headerRight,
        };
    };

  constructor(props) {
    super(props);

    this._onMatchTapped = this._onMatchTapped.bind(this);
  }

  componentWillUpdate(nextProps) {
    if(!!this.props.userProfile.admin && this.props.userProfile.admin === true && !this.state.isAdmin) {
        this.setState({ isAdmin: true });
        this.props.navigation.setParams(
            { headerRight: <TouchableOpacity
                            onPress={this._onMatchTapped}
                           >
                                <Text
                                    style={{ paddingRight: 17,
                                            color: theme.cream,
                                            fontSize: 17,
                                            fontFamily: 'WorkSans-Regular'
                                        }}
                                >Match</Text>
                           </TouchableOpacity>
        });
    }
  }

  _onMatchTapped() {
    const history = [{'dj': "dj2", 'dj2': "dj4", 'dj3': "dj", 'dj4': "dj5", 'dj5': "dj3"}, {dj: "dj4", dj2: "dj3", dj3: "dj5", dj4: "dj2", dj5: "dj"},{dj: "dj3", dj2: "dj5", dj3: "dj4", dj4: "dj", dj5: "dj2"}]
    generateMatchups(['dj', 'dj2', 'dj3', 'dj4', 'dj5'], history);
  }

  _sendButtonTapped() {
    this.setState({ recordHasBeenSent: !this.state.recordHasBeenSent });
  }

  _renderProfileImage() {
        let imageSource;
        console.log(this.props);
        if (!!this.props.userProfile.profileImage && this.props.userProfile.profileImage.downloadUrl) {
            imageSource = { uri: this.props.userProfile.profileImage.downloadUrl };
        } else if (!!this.props.userProfile.profileImage) {
            imageSource = this.props.userProfile.profileImage;
        } 

        let dimensions = 200;
        return (
            <View
              style={{ paddingTop: 0 }}>
                <Image 
                    resizeMode="center"
                    style={{ width: dimensions, height: dimensions, borderRadius: 175 }}
                    source={!!imageSource ? imageSource : require('../resources/images/avatar-default.png')} 
                />
            </View>
        )
    }
  
  render() {
      return (
        <View style={{ flex: 1, flexDirection: 'column', }}>
            <View style={{ flex: .8, backgroundColor: theme.primaryRed, width: '100%' }}>
            </View>
            <View style={{ flex: 1, backgroundColor: theme.cream, width: '100%' }}>
            </View>

              <View style={{ marginTop: -10, position: 'absolute', alignSelf: 'center' }}>
                <Image 
                  resizeMode="center"
                  source={require('../resources/images/vinyl.png')} 
                  style={styles.logoImage}
                /> 
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                   {this._renderProfileImage()} 
                </View>  
              </View> 

              <View style={{ marginTop: 15, position: 'absolute', alignSelf: 'center' }}>
                <SendButton onPress={this._sendButtonTapped.bind(this)} inActiveText='Mark as Sent' activeText='sent' isActive={this.state.recordHasBeenSent}/>
              </View>

              <View style={{ bottom: 55, position: 'absolute', justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{ marginVertical: 7, fontSize: 24, alignSelf: 'center', color: theme.primaryRed, fontWeight: 'bold' }}>DJ Ley</Text>
                <Text style={{ marginBottom: 7, fontSize: 17, alignSelf: 'center' }}>1943 N. Fremont St.</Text>
                <Text style={{ marginBottom: 7, fontSize: 17, alignSelf: 'center' }}>Chicago, IL, 60614</Text>
                <Text style={{ fontSize: 17, alignSelf: 'center' }}>United States</Text>
              </View>   
        </View>
      );
    }
}

const styles = {
  logoImageContainer: {
    justifyContent: 'flex-start',
  },
  logoImage: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = state => {
  console.log(state);
    return { userProfile: !!state.profile.userProfile && state.profile.userProfile };
};

export default connect(mapStateToProps, null)(ExchangeDetailScreen);

