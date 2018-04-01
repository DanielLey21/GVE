import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableHighlight,
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

/**
 * Wrapper on top of React-Native's [Picker](https://facebook.github.io/react-native/docs/picker.html)
 */
export class PickerModal extends Component {

  render() {
    console.log(this.props.showPicker);
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.props.showPicker}
        style={{ justifyContent: 'flex-end' }}
      >
        <View
          style={{ flexShrink: 1, height: 100 }}
        >
          <TouchableHighlight
            style={styles.doneButton}
            onPress={this.props.onDonePress}
          >
            <Text>Done</Text>
          </TouchableHighlight>
          <Picker
            onValueChange={this.props.onValueChange}
            selectedValue={getPickerValue(this.props.items, this.props.selectedIndex)}
            style={{ backgroundColor: theme.white }}
            ref={(ref) => {this.pickerRef = ref;}}
          >
            {
              this.props.items.map((item, index) => {
                const label = item.inputLabel;
                const value = item.pickerValue;
                return (
                  <Picker.Item
                    key={label}
                    label={label}
                    value={value}
                  />
                );
              })
            }
          </Picker>
        </View>
      </Modal>
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
};