import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { changeChoreDate } from '../actions';
import RNPickerSelect from 'react-native-picker-select';

class MonthlyChoreSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numbers: [
        {
          label: '1st',
          value: 1,
          color: 'orange'
        },
        {
          label: '2nd',
          value: 2,
          color: 'orange'
        },
        {
          label: '3rd',
          value: 3,
          color: 'orange'
        },
        {
          label: '4th',
          value: 4,
          color: 'orange'
        },
        {
          label: '5th',
          value: 5,
          color: 'orange'
        },
        {
          label: '6th',
          value: 6,
          color: 'orange'
        },
        {
          label: '7th',
          value: 7,
          color: 'orange'
        },
        {
          label: '8th',
          value: 8,
          color: 'orange'
        },
        {
          label: '9th',
          value: 9,
          color: 'orange'
        },
        {
          label: '10th',
          value: 10,
          color: 'orange'
        },
        {
          label: '11th',
          value: 11,
          color: 'orange'
        },
        {
          label: '12th',
          value: 12,
          color: 'orange'
        },
        {
          label: '13th',
          value: 13,
          color: 'orange'
        },
        {
          label: '14th',
          value: 14,
          color: 'orange'
        },
        {
          label: '15th',
          value: 15,
          color: 'orange'
        },
        {
          label: '16th',
          value: 16,
          color: 'orange'
        },
        {
          label: '17th',
          value: 17,
          color: 'orange'
        },
        {
          label: '18th',
          value: 18,
          color: 'orange'
        },
        {
          label: '19th',
          value: 19,
          color: 'orange'
        },
        {
          label: '20th',
          value: 20,
          color: 'orange'
        },
        {
          label: '21st',
          value: 21,
          color: 'orange'
        },
        {
          label: '22nd',
          value: 22,
          color: 'orange'
        },
        {
          label: '23rd',
          value: 23,
          color: 'orange'
        },
        {
          label: '24th',
          value: 24,
          color: 'orange'
        },
        {
          label: '25th',
          value: 25,
          color: 'orange'
        },
        {
          label: '26th',
          value: 26,
          color: 'orange'
        },
        {
          label: '27th',
          value: 27,
          color: 'orange'
        },
        {
          label: '28th',
          value: 28,
          color: 'orange'
        },
        {
          label: '29th',
          value: 29,
          color: 'orange'
        },
        {
          label: '30th',
          value: 30,
          color: 'orange'
        },
        {
          label: '31st',
          value: 31,
          color: 'orange'
        }
      ],
      favNumber: '0'
    };
  }

  componentWillMount() {
    console.log('date thing', this.props.date);
    this.setState({ favNumber: this.props.date });
  }

  submitInfo() {
    // this.setState({ displayed: false, message: 'Due dates selected' });
    this.props.changeChoreDate(this.state.favNumber, false, 'monthly');
  }

  render() {
    return (
      <ScrollView>
        <RNPickerSelect
          placeholder={{
            label: 'Select monthly due date',
            value: null,
            color: 'black'
          }}
          items={this.state.numbers}
          onDonePress={() => this.submitInfo()}
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
  { changeChoreDate }
)(MonthlyChoreSelector);
