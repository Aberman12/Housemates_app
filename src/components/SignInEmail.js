import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  firstNameChanged,
  lastNameChanged,
  phoneChanged,
  setProfilePicture
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class SignUpEmail extends Component {
  state = {
    avatarSource: 'http://www.venmond.com/demo/vendroid/img/avatar/big.jpg',
    videoSource: null
  };

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

  onphoneChange(text) {
    this.props.phoneChanged(text);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    // ImagePicker.showImagePicker(options, response => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled photo picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     let source = { uri: response.uri };

    //     // You can also display the image using data:
    //     // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    //     this.setState({
    //       avatarSource: source
    //     });
    //   }
    // });
    this.onChangePhoto(this.state.avatarSource);
  }

  onChangePhoto(img) {
    console.log('made it to change PHoto: ', img);
    this.props.setProfilePicture(img);
  }

  onButtonPress() {
    const { email, password, firstName, lastName, phoneNumber, profilePicture } = this.props;
    if (!email) {
      this.showEmpltyEntryError('email');
    } else if (!password) {
      this.showEmpltyEntryError('password');
    } else if (!firstName) {
      this.showEmpltyEntryError('firstName');
    } else if (!lastName) {
      this.showEmpltyEntryError('lastName');
    } else if (!phoneNumber) {
      this.showEmpltyEntryError('phoneNumber');
    } else {
      this.props.loginUser({ email, password, firstName, lastName, phoneNumber, profilePicture });
    }
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
        <CardSection>
          <Input
            label="Phone #"
            placeholder="(optional) - For housemates to view"
            onChangeText={this.onphoneChange.bind(this)}
            value={this.props.phoneNumber}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.selectPhotoTapped.bind(this)}>Pick Profile Picture</Button>
        </CardSection>
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
  const {
    email,
    password,
    firstName,
    lastName,
    error,
    loading,
    phoneNumber,
    profilePicture
  } = auth;
  return { email, password, firstName, lastName, error, loading, phoneNumber, profilePicture };
};

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    loginUser,
    firstNameChanged,
    lastNameChanged,
    phoneChanged,
    setProfilePicture
  }
)(SignUpEmail);
