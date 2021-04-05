/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: '',
      UserPassword: '',
    };
  }

  UserLoginFunction = () => {
    const {UserEmail} = this.state;
    const {UserPassword} = this.state;

    fetch('http://192.168.43.44/task/Insert_Details.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: UserEmail,

        password: UserPassword,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson === 'Data Matched') {
          //Then open Profile activity and send user email to profile activity.
          this.props.navigation.navigate('Profile', {
            email: this.state.UserEmail,
          });
        } else {
          this.props.navigation.navigate('Register', {
            data: this.state.UserEmail,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
 
  render() {
    return (
      <>
        <ImageBackground
          source={{
            uri:
              'https://img.freepik.com/free-vector/abstract-background-with-dots-blurry-shapes_23-2148705493.jpg?size=626&ext=jpg&ga=GA1.2.934351675.1604620800',
          }}
          style={styles.image}>
          <View style={styles.container}>
            <Image
              style={{
                height: 150,
                width: 200,
                marginTop: 50,
                alignSelf: 'center',
              }}
              source={{uri: 'https://img.icons8.com/clouds/2x/school.png'}}
            />

            <View>
              <Text style={styles.text}>Email Id</Text>
              <TextInput
                placeholder="Email Id"
                style={styles.input}
                onChangeText={userEmail => this.setState({userEmail})}
              />
            </View>

            <View>
              <Text style={styles.text}>Password</Text>
              <TextInput
                placeholder="Password"
                style={styles.input}
                onChangeText={userPassword => this.setState({userPassword})}
              />
            </View>

            <TouchableOpacity onPress={this.UserLoginFunction}>
              <View
                style={{
                  backgroundColor: '#9156c2',
                  height: 50,
                  marginTop: 20,
                  justifyContent: 'center',
                  width: '80%',
                  marginLeft: '10%',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    fontSize: 25,
                  }}>
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    marginTop: 20,
    color: '#9156c2',
    fontSize: 20,
    marginLeft: '10%',
  },

  input: {
    borderColor: '#9156c2',
    borderWidth: 2,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 10,
  },
  container: {
    height: '70%',
    width: '80%',
    marginLeft: '10%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 30,
    backgroundColor: 'white',
  },
});
