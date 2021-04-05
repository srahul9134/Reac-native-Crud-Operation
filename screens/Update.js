import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserFirstName: {},
      UserLastName: {},
      UserMobile: {},
      UserEmail: {},
    };
  }

  componentDidMount() {
    this.setState({
      UserEmail: this.props.route.params.email,
      UserFirstName: this.props.route.params.fname,
      UserLastName: this.props.route.params.lname,
      UserMobile: this.props.route.params.mobile,
    });
  }

  UpdateRecord = () => {
    fetch('http://192.168.43.44/task/Update.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname: this.state.UserFirstName,

        lname: this.state.UserLastName,

        mobile: this.state.UserMobile,

        email: this.state.UserEmail,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson === 'success') {
          //Then open Profile activity and send user email to profile activity.
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('Profile');
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
            style={{
              height: 50,
              borderRadius: 1,
              borderColor: 'grey',
              marginRight: '10%',
              borderBottomWidth: 3,
              justifyContent: 'center',
              marginTop: '20%',
              marginLeft: '10%',
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="First Name"
              style={{fontSize: 20}}
              defaultValue={this.props.route.params.fname}
              onChangeText={UserFirstName => this.setState({UserFirstName})}
            />
          </View>

          <View style={styles.data}>
            <TextInput
              placeholder="Last Name"
              style={{fontSize: 20}}
              defaultValue={this.props.route.params.lname}
              onChangeText={UserLastName => this.setState({UserLastName})}
            />
          </View>

          <View style={styles.data}>
            <TextInput
              placeholder="Mobile"
              style={{fontSize: 20}}
              defaultValue={this.props.route.params.mobile}
              onChangeText={UserMobile => this.setState({UserMobile})}
            />
          </View>
          <View style={styles.data}>
            <TextInput
              placeholder="Email"
              defaultValue={this.props.route.params.email}
              onChangeText={UserEmail => this.setState({UserEmail})}
              style={{fontSize: 20}}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={this.UpdateRecord}>
            <View
              style={{
                alignSelf: 'center',
                marginTop: '10%',
                backgroundColor: '#5dade2',
                height: 50,
                borderBottomColor: 'grey',
                borderBottomWidth: 4,
                borderRadius: 120,
              }}>
              <Text style={{fontSize: 30, marginLeft: 20, marginRight: 20}}>
                Update
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  data: {
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
