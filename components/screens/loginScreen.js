import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default class LoginScreen extends Component {

  constructor() {
    super();

    this.onPressButton = this.onPressButton.bind(this);

    this.state = {
      userEmail: '',
      userPassword: ''
    }

  }

  onPressButton() {
    const { navigate } = this.props.navigation;
    const { userEmail, userPassword } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (userEmail == "") {
      alert("Please enter Email address");
      this.setState({ email: 'Please enter Email address' })

    }


    else if (reg.test(userEmail) === false) {
      //alert("Email is Not Correct");
      this.setState({ email: 'Email is Not Correct' })
      return false;
    }

    else if (userPassword == "") {
      this.setState({ email: 'Please enter password' })
    }
    else {

      axios.post('http://192.168.1.2/backend/login.php', {
        email: userEmail,
        password: userPassword
      })
        .then((response) =>{ console.log(response.data.full_name)
        if (response.data.role_id == 0) {
          // redirect to profile page
          alert("Successfully Login");
          this.props.navigation.replace("AdminHome",{info: response.data});            
        }
        else if (response.data.role_id == 1) {
          // redirect to profile page
          alert("Successfully Login");
          this.props.navigation.replace("DriverHome",{info: response.data});
        }
        else if (response.data.role_id == 2) {
          // redirect to profile page
          alert("Successfully Login");
          this.props.navigation.replace("UserHome",{info: response.data});
        }else {
          alert("Wrong Login Details");                
        } 
        })
        .catch((error) => {
          console.error(error);
        });

    }
  


  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Daha İyi Bir Çevre İçin</Text>
        <Text style={styles.logo2}>Çöp Yönetimi</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={userEmail => this.setState({ userEmail })}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Şifre..."
            placeholderTextColor="#003f5c"
            onChangeText={userPassword => this.setState({ userPassword })}
          />
        </View>
        <TouchableOpacity>
          {/* <Text style={styles.forgot}>Şifreni mi Unuttun?</Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onPressButton}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>GİRİŞ</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.replace('Register')}>
          <Text style={styles.signupText}>KAYIT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#caf0e9',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 21,
    color: "#03045e",
    marginBottom: 0
  },
  logo2: {
    fontWeight: "bold",
    fontSize: 35,
    color: "#03045e",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#E1ECF5",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "#03045e"
  },
  forgot: {
    color: "#03045e",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#28587D",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "#E1ECF5"
  },
  signupText: {
    color: '#28587D'
  }

});

module.exports = LoginScreen;