import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { setChoreMember } from '../actions';
import RNPickerSelect from 'react-native-picker-select';

class MemberSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      favNumber: 'none-selected'
    };
  }
  componentWillMount() {
    console.log('will mount props: ', this.props);
    let members = this.props.members.map(member => {
      let memberObj = {
        label: `${member.firstName} ${member.lastName}`,
        value: member._id,
        color: 'orange'
      };
      return memberObj;
    });
    this.setState({ members });
  }

  sendChoreMemberToCreateChore() {
    this.props.setChoreMember(this.state.favNumber);
  }

  render() {
    return (
      <ScrollView>
        <RNPickerSelect
          placeholder={{
            label: 'Select member',
            value: null,
            color: 'black'
          }}
          items={this.state.members}
          onDonePress={() => {
            this.sendChoreMemberToCreateChore();
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
      </ScrollView>
    );
  }
}

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
  const { members } = groupReducer;
  return { members };
};

export default connect(
  mapStateToProps,
  { setChoreMember }
)(MemberSelector);
