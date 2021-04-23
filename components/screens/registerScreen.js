import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faCalendar } from '@fortawesome/free-solid-svg-icons'


export default class RegisterScreen extends Component {

  constructor() {
    super();

    this.onPressButton = this.onPressButton.bind(this);

    this.state = {
      userEmail: '',
      userPassword: '',
      userName:'',
      userPhone:'',
      userAddress:'',
      date: '2021-01-01'
    }

  }

  

  onPressButton() {

    
    const { navigate } = this.props.navigation;
    const { userEmail, userPassword, userName, userPhone, userAddress, date } = this.state;
    console.log(this.state)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (userEmail == "") {
      alert("Please enter Email address");
      this.setState({ email: 'Please enter Email address' })

    }
    else if (reg.test(userEmail) === false) {
      alert("Email is Not Correct");
      this.setState({ email: 'Email is Not Correct' })
      return false;
    }
    else if (userPassword == "") {
      this.setState({ email: 'Please enter password' })
    }
    else {

      fetch('http://192.168.1.2/backend/register.php', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          // we will pass our input data to server
          name: userName,
          email: userEmail,
          password: userPassword,
          phone: userPhone,
          address: userAddress,
          date: date
        })

      })
      .then((response) => response.text())
      .then((responseJson) => {
          if (responseJson === 'inserted') {
              
          }else {
            alert("Successfully Registered");
            this.props.navigation.replace('Login')    
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }


    Keyboard.dismiss();
  }


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.header}>Hesap Oluştur</Text>
          <TouchableOpacity style={{ position: 'absolute', top: 66.5, left: 10 }}
            onPress={(props) => { this.props.navigation.replace('Login')}}
          >
            <FontAwesomeIcon  icon={faAngleLeft} color='rgb(39, 87, 124)' size={32} />
          </TouchableOpacity>
          <ScrollView style={styles.containerInner}>
            <View style={{ marginTop: 70 }}>
              <View style={styles.formRow}>
                <View style={styles.left}>
                  <Text style={styles.formLeft}>İsim</Text>
                </View>
                <View style={styles.right}>
                  <TextInput
                    style={styles.formRight}
                    placeholder="Ad Soyad"
                    placeholderTextColor="#ababab"
                    onChangeText={userName => this.setState({ userName })}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.left}>
                  <Text style={styles.formLeft}>Email</Text>
                </View>
                <View style={styles.right}>
                  <TextInput
                    style={styles.formRight}
                    placeholder="Email"
                    placeholderTextColor="#ababab"
                    onChangeText={userEmail => this.setState({ userEmail })}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.left}>
                  <Text style={styles.formLeft}>Şifre</Text>
                </View>
                <View style={styles.right}>
                  <TextInput
                    style={styles.formRight}
                    placeholder="Şifre"
                    placeholderTextColor="#ababab"
                    onChangeText={userPassword => this.setState({ userPassword })}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.left}>
                  <Text style={styles.formLeft}>Adres</Text>
                </View>
                <View style={styles.right}>
                  <TextInput
                    style={styles.formRight}
                    placeholder="Adres"
                    placeholderTextColor="#ababab"
                    onChangeText={userAddress => this.setState({ userAddress })}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.left}>
                  <Text style={styles.formLeft}>Telefon</Text>
                </View>
                <View style={styles.right}>
                  <TextInput
                    style={styles.formRight}
                    placeholder="Telefon No"
                    placeholderTextColor="#ababab"
                    onChangeText={userPhone => this.setState({ userPhone })}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.left}>
                  <Text style={styles.formLeft}>Doğum Günü</Text>
                </View>
                <View style={styles.right}>

                  <DatePicker
                    style={{
                      width: 180, marginTop: -6,
                    }}

                    mode="date"
                    showIcon={false}
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate="2022-12-12"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"

                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        borderWidth: 0
                      },
                      placeholderText: {
                        fontSize: 18,
                        color: '#ababab'
                      }
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                  />
                  <FontAwesomeIcon style={{ position: 'absolute', top: 4, right: -4 }} icon={faCalendar} color='rgba(39, 87, 124, 0.84)' size={20} />
                </View>
              </View>



            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={this.onPressButton}
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>Tamamla</Text>

          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1ECF5",
  },
  containerInner: {
    maxHeight: 500,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 10,
    paddingLeft: 8,
    paddingTop: 10,
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

  },
  header: {
    marginTop: 70,
    marginLeft: 50,
    marginBottom: 30,
    fontSize: 18,
    color: "#28587D",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 35,
    color: "#03045e",
    marginBottom: 40
  },
  loginBtn: {
    width: "87%",
    backgroundColor: "#28587D",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: '7%'
  },
  loginText: {
    color: 'white'
  },
  left: {
    flex: 0.38,
    alignItems: 'flex-start'
  },
  right: {
    flex: 0.55,
    alignItems: 'center',
    borderBottomColor: '#ababab',
    borderBottomWidth: 1,
    marginTop: 3,

  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  formLeft: {
    marginTop: 4,
    marginLeft: 15,
    fontSize: 18,
    color: "#28587D",
  },
  formRight: {
    fontSize: 17,
  }
});

module.exports = RegisterScreen;