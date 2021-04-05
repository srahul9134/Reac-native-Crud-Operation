/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity,StyleSheet,Alert} from 'react-native';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserFirstName: '',
      UserLastName: '',
      UserMobile: '',
      UserEmail: {},
    };
  }
  componentDidMount() {
    console.log(this.props.route.params.data);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({UserEmail: this.props.route.params.data});
  }

  UserLoginFunction = () => {
    const {UserFirstName} = this.state;
    const {UserLastName} = this.state;
    const {UserMobile} = this.state;
    const {UserEmail} = this.state;

    fetch('http://192.168.43.44/task/Insert_Details1.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname: UserFirstName,
        lname: UserLastName,
        email: UserEmail,
        mobile: UserMobile,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson === 'Details Saved Successfully') {
          //Then open Profile activity and send user email to profile activity.
          this.props.navigation.navigate('Home');
        } else {
          Alert.alert(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View>
        <View>
          <View
            style={styles.container}>
            <TextInput
              placeholder="First Name"
              style={{fontSize: 20}}
              onChangeText={UserFirstName => this.setState({UserFirstName})}
            />
          </View>

          <View
            style={styles.container}>
            <TextInput
              placeholder="Last Name"
              style={{fontSize: 20}}
              onChangeText={UserLastName => this.setState({UserLastName})}
            />
          </View>

          <View
            style={styles.container}>
            <TextInput
              placeholder="Mobile"
              style={{fontSize: 20}}
              onChangeText={UserMobile => this.setState({UserMobile})}
            />
          </View>
          <View style={{}}>
            <TextInput
              placeholder="Email"
              defaultValue={this.props.route.params.data}
              style={{fontSize: 20}}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={this.UserLoginFunction}>
            <View
              style={styles.container}>
              <Text style={{fontSize: 30, marginLeft: 20, marginRight: 20}}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Register;

const styles = StyleSheet.create({
  Container: {
    height: 50,
    borderColor: 'grey',
    marginRight: '10%',
    borderRadius: 10,
    borderBottomWidth: 3,
    justifyContent: 'center',
    marginTop: '10%',
    marginLeft: '10%',
  },
});
