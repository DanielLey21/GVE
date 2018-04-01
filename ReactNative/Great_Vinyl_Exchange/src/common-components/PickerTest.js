import React, { Component } from 'react';
import { 
    TextInput, 
    View, 
    Text, 
    LayoutAnimation,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import theme from '../styles/theme';
import { Style, em } from '../styles/styles';

import { PickerModal } from './PickerModal';
import { getPickerValue, getItemLabel } from './utils/pickerUtils';

const initialState = {
  selectedIndex: undefined,
  showPicker: false,
  scrollYOffset: 0,
  shouldScroll: false,
  isMeasured: false,
  pickerDimensions: {},
};

export class PickerTest extends Component {
  static defaultProps = {
    doesBackgroundPressCallOnSelect: true,
    isActive: true,
    placeholder: 'Select Item',
  };

  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      selectedIndex: props.selectedIndex,
    };

    this._onSelectPickerItem = this._onSelectPickerItem.bind(this);
    this._onLabelPress = this._onLabelPress.bind(this);
    this._onHandsetValueChange = this._onHandsetValueChange.bind(this);
    this._onHandsetDonePress = this._onHandsetDonePress.bind(this);
    this._onHandsetBackgroundPress = this._onHandsetBackgroundPress.bind(this);
  }

  _onSelectPickerItem(selectedValue, selectedIndex) {
    //console.log('onHandsetValueChange');
    this.setState({
      showPicker: false,
    });

    this.props.onSelect && this.props.onSelect(selectedValue, selectedIndex);
    this.props.onBlur && this.props.onBlur(selectedValue, selectedIndex);
  }

  _renderInputLabel() {
    const { style, label, placeholder, value, showError } = this.props;
    const { inputStyle, labelStyle, errorLabelStyle, containerStyle } = styles;
    return(
        <View style={containerStyle}>
            <TouchableWithoutFeedback onPress={this._onLabelPress}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={theme.gray}
                    autoCorrect={false}
                    style={[inputStyle, style]}
                    editable={false}
                    onFocus={this._onLabelPress}
                    value={getItemLabel(this.props.items, this.state.selectedIndex)}
                />
            </TouchableWithoutFeedback>
            <Text style={showError ? errorLabelStyle : labelStyle}>{label}</Text>
        </View>
    );
  }

  _onHandsetValueChange(pickerValue, itemPosition) {
    //console.log('onHandsetValueChange');
    const isAndroid = Platform.OS === 'android';
    let showPicker = this.state.showPicker;

    if (isAndroid) {
      showPicker = false;
    }

    if (this.props.isOnSelectOnly) {
      this.setState({
        pendingIndex: itemPosition,
        showPicker,
      });
    } else {
      this.setState({
        selectedIndex: itemPosition,
        showPicker,
      });

      if (this.props.onValueChange) {
        this.props.onValueChange(pickerValue, itemPosition);
      }

      if (!!this.props.onSelect) {
        this.props.onSelect(pickerValue, itemPosition);
      }
    }
  }

  _onLabelPress() {
    this.props.onLabelPress && this.props.onLabelPress();
    console.log('I am here');
    Keyboard.dismiss()

    const noSelectedIndex = this.state.selectedIndex === undefined;
    if (noSelectedIndex && !this.props.isOnSelectOnly) {
      console.log('i am here 2');
      const defaultIndex = 0;
      const value = this.props.items[defaultIndex].pickerValue;
      this.setState({
        showPicker: true,
        selectedIndex: defaultIndex,
      }, () => {
        this.props.onValueChange && this.props.onValueChange(value, defaultIndex);
      });
    } else {
      console.log('i am here 3');
      this.setState({
        showPicker: true,
      });
    }
  }

  _onHandsetDonePress() {
    const selectedIndex = this.state.selectedIndex || 0;
    const selectedValue = getPickerValue(this.props.items, selectedIndex);
    this._onSelectPickerItem(selectedValue, selectedIndex);
  }

  _onHandsetBackgroundPress() {
    if (this.props.doesBackgroundPressCallOnSelect) {
      this._onHandsetDonePress();
    } else {
      const selectedValue = getPickerValue(this.props.items, this.state.selectedIndex);
      this.props.onBlur && this.props.onBlur(selectedValue, this.state.selectedIndex);
      this.setState({
        pendingIndex: undefined,
        showPicker: false,
      });
    }
  }

  render() {
      //console.log(this.props);
      //console.log(this.state);
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={this._onLabelPress}
        >
            {this._renderInputLabel()}
        </TouchableWithoutFeedback>
         <View style={{//flex: 1,
            position: 'absolute',
            //left: 0,
            //bottom: 0,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center' }}>
            <PickerModal
                showPicker={this.state.showPicker}
                onDonePress={this._onHandsetDonePress}
                onBackgroundPress={this._onHandsetBackgroundPress}
                onValueChange={this._onHandsetValueChange}
                selectedIndex={this.state.pendingIndex || this.state.selectedIndex}
                items={this.props.items}
                //onLayoutChange={this._onLayout}
            /> 
        </View>
      </View>
    );
  }
}

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