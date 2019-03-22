import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  firstNameChanged,
  lastNameChanged,
  phoneChanged
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class SignUpEmail extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onfirstNameChange(text) {
    this.props.firstNameChanged(text);
  }

  onlastNameChange(text) {
    this.props.lastNameChanged(text);
  }

  // onphoneChange(text) {
  //   this.props.phoneChanged(text);
  // }

  onButtonPress() {
    const { email, password, firstName, lastName } = this.props;
    this.props.loginUser({ email, password, firstName, lastName });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Continue to Account Setup</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="First"
            placeholder="name"
            onChangeText={this.onfirstNameChange.bind(this)}
            value={this.props.firstName}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Last"
            placeholder="name"
            onChangeText={this.onlastNameChange.bind(this)}
            value={this.props.lastName}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        {/* <CardSection>
          <Input
            label="Phone #"
            placeholder="(optional) - For housemates to view"
            onChangeText={this.onphoneChange.bind(this)}
            value={this.props.phoneNumber}
          />
        </CardSection> */}
        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, firstName, lastName, error, loading } = auth;
  return { email, password, firstName, lastName, error, loading };
};

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    loginUser,
    firstNameChanged,
    lastNameChanged
  }
)(SignUpEmail);
