import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Button
} from 'react-native';

import theme from '../styles/theme';

import { getPickerValue } from './utils/pickerUtils';


// type Props = {
//   showPicker: boolean,
//   onDonePress?: Function,
//   onBackgroundPress?: Function,
//   onValueChange: Function,
//   selectedIndex?: number,
//   items: Array<Item>,
//   onLayoutChange: Function,
// }

const { width: WindowWidth } = Dimensions.get('window');

/**
 * Wrapper on top of React-Native's [Picker](https://facebook.github.io/react-native/docs/picker.html)
 */
export class PickerModal extends Component {

  state = {
    language: 'js',
    modalIsVisible: false,
    modalAnimatedValue: new Animated.Value(0),
  };

  componentWillUpdate(nextProps) {
      console.log(nextProps);
      console.log(this.props)
      if (nextProps.showPicker && !this.props.showPicker) {
          this.setState({ modalIsVisible: true }, () => {
            Animated.timing(this.state.modalAnimatedValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
          });
      }
  }

  _handlePressDone = () => {
    Animated.timing(this.state.modalAnimatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ modalIsVisible: false });
    });
  };

  render() {
    if (!this.state.modalIsVisible) {
      return null;
    }

    const { modalAnimatedValue } = this.state;
    const opacity = modalAnimatedValue;
    const translateY = modalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    });

    console.log(this.props.showPicker);
    console.log(this.state.modalIsVisible)
    
    return (
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={this.state.modalIsVisible ? 'auto' : 'none'}>
        <TouchableWithoutFeedback onPress={this._handlePressDone}>
          <Animated.View style={[styles.overlay, { opacity }]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            transform: [{ translateY }],
          }}>
          <View style={styles.toolbar}>
            <View style={styles.toolbarRight}>
              <Button title="Done" onPress={this._handlePressDone} />
            </View>
          </View>
          <Picker
            style={{ width: WindowWidth, backgroundColor: '#e1e1e1' }}
            selectedValue={getPickerValue(this.props.items, this.props.selectedIndex)}
            onValueChange={this.props.onValueChange}>
            {
              this.props.items.map((item, index) => {
                const label = item.inputLabel;
                const value = item.pickerValue;
                return (
                  <Picker.Item
                    key={index}
                    label={label}
                    value={value}
                  />
                );
              })
            }
          </Picker>
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  doneButton: {
    padding: 8,
    paddingRight: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.gray,
    borderBottomColor: theme.gray,
    backgroundColor: theme.cream,
    alignItems: 'flex-end',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  toolbar: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  toolbarRight: {
    alignSelf: 'flex-end',
  },
};