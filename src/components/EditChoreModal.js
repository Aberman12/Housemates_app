import React from 'react';
import { Text, View, Modal, TextInput } from 'react-native';
import { Button, Card, Input, CardSection } from './common';
import { connect } from 'react-redux';
import { showChoreEditModal } from '../actions';
import DatePicker from './ChoreDatePicker';
import WeeklyChoreSelector from './WeeklyChoreSelector';
import MonthlyChoreSelector from './MonthlyChoreSelector';
import BiMonthlyChoreSelector from './BiMonthlyChoreSelector';
import Voice from 'react-native-voice';

const EditChoreModal = ({
  children,
  visible,
  onAccept,
  onDecline,
  onDelete,
  onChangeTextFunc,
  onChangeNoteFunc,
  props
}) => {
  const { cardStyle, containerStyle, textStyle, cardSectionStyle } = styles;

  const showChoreType = () => {
    console.log('heres the props type: ', props.choreSelected.type);
    if (props.choreSelected.type === 'one-time') {
      return <DatePicker date={props.choreSelected.dueDate} updatedDate={props.newChoreDueDate} />;
    } else if (props.choreSelected.type === 'weekly') {
      return (
        <WeeklyChoreSelector
          date={props.choreSelected.dueDate}
          updatedDate={props.newChoreDueDate}
        />
      );
    } else if (props.choreSelected.type === 'monthly') {
      console.log('heres my rpops: ', props);
      return (
        <MonthlyChoreSelector
          date={props.choreSelected.dueDate}
          updatedDate={props.newChoreDueDate}
        />
      );
    } else if (props.choreSelected.type === 'Bi-monthly') {
      console.log('heres my rpops: ', props);
      return <BiMonthlyChoreSelector date={props.choreSelected.dueDate} />;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
      <View style={containerStyle}>
        <Card style={cardStyle}>
          <CardSection style={cardSectionStyle}>
            <Text style={textStyle}>{children}</Text>
          </CardSection>

          <CardSection>
            <Input
              onChangeText={text => {
                onChangeTextFunc(text);
              }}
              value={props.newChoreListName}
            />
          </CardSection>

          <CardSection>{showChoreType()}</CardSection>
          <CardSection>
            <Text>Add note: </Text>
            <TextInput
              style={{ fontSize: 20 }}
              numberOfLines={2}
              multiline="true"
              type="text"
              onChangeText={text => {
                onChangeNoteFunc(text);
              }}
              value={props.choreNote}
            />
          </CardSection>

          <CardSection>
            <Button onPress={onDecline}>Cancel</Button>
            <Button onPress={onAccept}>Save</Button>
          </CardSection>
          <CardSection>
            <Button onPress={onDelete}>Delete Chore</Button>
          </CardSection>
        </Card>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  cardStyle: {
    borderRadius: 50
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

const mapStateToProps = ({ groupReducer }) => {
  const { choreSelected, newChoreDueDate } = groupReducer;
  return { choreSelected, newChoreDueDate };
};

export default connect(
  mapStateToProps,
  { showChoreEditModal }
)(EditChoreModal);
