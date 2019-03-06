import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { setChoreType } from '../actions';
import RNPickerSelect from 'react-native-picker-select';

class ChoreTypeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null
    };

    this.state = {
      numbers: [
        {
          label: 'weekly',
          value: 'weekly',
          color: 'orange'
        },
        {
          label: 'monthly',
          value: 'monthly',
          color: 'orange'
        },
        {
          label: 'one-time',
          value: 'one-time',
          color: 'orange'
        }
      ],
      favNumber: 'none-selected'
    };
  }

  sendChoreTypeToCreateChore() {
    this.props.setChoreType(this.state.favNumber);
  }

  render() {
    // const placeholder = {
    //   label: 'Select a sport...',
    //   value: null,
    //   color: '#9EA0A4'
    // };

    return (
      <ScrollView>
        <RNPickerSelect
          placeholder={{
            label: 'Select Chore Type',
            value: null,
            color: 'black'
          }}
          items={this.state.numbers}
          onDonePress={() => {
            this.sendChoreTypeToCreateChore();
          }}
          onValueChange={value => {
            this.setState({
              favNumber: value
            });
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 20,
              right: 10
            }
          }}
          value={this.state.favNumber}
          placeholderTextColor="orange"
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: 'transparent',
                  borderTopWidth: 10,
                  borderTopColor: 'gray',
                  borderRightWidth: 10,
                  borderRightColor: 'transparent',
                  borderLeftWidth: 10,
                  borderLeftColor: 'transparent',
                  width: 0,
                  height: 0
                }}
              />
            );
          }}
        />
        {/* <Button
          title="+1 number to the above list"
          onPress={() => {
            const { numbers } = this.state;
            const value = numbers.length + 1;
            numbers.push({
              label: `${value}`,
              value,
              color: 'dodgerblue'
            });
            this.setState({
              numbers
            });
          }}
        /> */}
      </ScrollView>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 40,
//     paddingHorizontal: 10,
//     flex: 1
//   }
// });

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    // borderColor: 'eggplant',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

const mapStateToProps = ({ groupReducer }) => {
  const { choreType } = groupReducer;
  return { choreType };
};

export default connect(
  mapStateToProps,
  { setChoreType }
)(ChoreTypeSelector);
