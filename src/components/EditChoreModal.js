import React from "react";
import { Text, View, Modal } from "react-native";
import { Button, Card, Input, CardSection } from "./common";
import { connect } from "react-redux";
import { showChoreEditModal } from "../actions";
import DatePicker from "./ChoreDatePicker";

const EditChoreModal = ({
  children,
  visible,
  onAccept,
  onDecline,
  onDelete,
  onChangeTextFunc,
  props
}) => {
  const { cardStyle, containerStyle, textStyle, cardSectionStyle } = styles;
  console.log("newest", props);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <Card style={cardStyle}>
          <CardSection style={cardSectionStyle}>
            <Text style={textStyle}>{children}</Text>
          </CardSection>

          <CardSection>
            <Input
              onChangeText={text => onChangeTextFunc(text)}
              placeholder="list name"
              value={props.choreSelected}
            />
          </CardSection>

          <CardSection>
            <Text>Date Due</Text>
            <DatePicker />
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
    justifyContent: "center"
  },
  cardStyle: {
    borderRadius: 50
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    position: "relative",
    flex: 1,
    justifyContent: "center"
  }
};

const mapStateToProps = ({ groupReducer }) => {
  const { choreSelected } = groupReducer;
  return { choreSelected };
};

export default connect(
  mapStateToProps,
  { showChoreEditModal }
)(EditChoreModal);
