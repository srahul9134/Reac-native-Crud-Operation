/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log(this.props.route.params.data);
    return fetch(
      'http://192.168.43.44/task/data.php?email=' +
        this.props.route.params.data,
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {
            // In this block you can do something with new state.
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  DeleteStudentRecord = () => {
    fetch('http://192.168.43.44/task/delete.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.props.route.params.data,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });

    this.props.navigation.navigate('Home');
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <>
        <Image
          source={{
            uri:
              'https://th.bing.com/th/id/OIP.rQeqEJ4PlccEwEnwub7eEAHaHw?pid=ImgDet&w=860&h=901&rs=1',
          }}
          style={{height: '40%', width: '80%', marginLeft: '10%'}}
        />
        <View style={styles.MainContainer}>
          <FlatList
            data={this.state.dataSource}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <View>
                <View style={styles.button}>
                  <Text style={styles.text}>
                    First Name : {item.fname}
                  </Text>
                </View>

                <View style={styles.button}>
                  <Text style={styles.text}>
                    Last Name : {item.lname}
                  </Text>
                </View>

                <View style={styles.button}>
                  <Text style={styles.text}>
                    Mobile No. : {item.mobile}
                  </Text>
                </View>

                <View style={styles.button}>
                  <Text style={styles.text}>
                    Email Id : {item.email}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* EDIT DELETE REPORT */}

                  {/* EDIT */}

                  <View
                    style={{
                      color: 'black',
                      padding: 10,
                      borderRadius: 20,
                      marginTop: 20,
                      backgroundColor: 'green',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Update', {
                          email: item.email,
                          fname: item.fname,
                          lname: item.lname,
                          mobile: item.mobile,
                        })
                      }>
                      <Text style={{fontWeight: 'bold'}}>Edit</Text>
                    </TouchableOpacity>
                  </View>

                  {/* DELETE */}

                  <View
                    style={{
                      color: 'black',
                      padding: 10,
                      borderRadius: 20,
                      marginTop: 20,
                      backgroundColor: 'green',
                    }}>
                    <TouchableOpacity onPress={this.DeleteStudentRecord}>
                      <View
                        style={{
                          marginRight: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontWeight: 'bold'}}>Delete</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    flex: 1,
    backgroundColor: '#bcb7bf',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 10,
  },
  text:{
    fontSize: 18, fontWeight: 'bold'
  },
  button: {
    color: 'black',
    height: 50,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 2,
    borderColor: 'green',
    marginTop: 20,
    backgroundColor: '#9156c2',
  },
});

export default Profile;
