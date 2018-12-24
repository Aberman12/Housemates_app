import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SignUpButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    color: "#007aff",
    fontSize: 13,
    fontWeight: "600",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    paddingRight: 2
  },
  buttonStyle: {
    // flex: 1,
    // alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 83,
    marginRight: 5
  }
};

export { SignUpButton };
