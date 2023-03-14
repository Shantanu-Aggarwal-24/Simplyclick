import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input, Icon } from '@rneui/themed';
import CustomButton from '../components/CustomButton';
// import Toast from 'react-native-simple-toast';

import {AuthContext} from '../navigation/Authcontext';
const RegisterScreen = ({navigation}) => {
  const {signup} = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [pass, setPass] = useState();
  const [confPass, setConfPass] = useState();
  const baseUrl = ""
  const signupCall = async () => {
    if(email && name && pass && confPass && (pass == confPass)){
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      // Toast.show('Email is Not Correct', Toast.LONG);
      Alert.alert(
        "Invalid Input",
        "Email is Not Correct",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      console.log("Email is Not Correct");
    }
    else {
      console.log("Email is Correct");
      try {
        let user = await fetch(baseUrl+'/signup',
         { method : 'POST',  
          headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name :  name, email :  email, password :  pass}) })
      
      console.log("message from call",user);
      user = await user.json();
      if(user.message == "user already exists"){
        
        // Toast.show('User already exists please Login', Toast.LONG);
        Alert.alert(
          "User Exists",
          "User already exists please Login",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }else if(user.message == "user Created successfully"){
        // navigation.goBack()
        signup(email, pass);
      }
      } catch (error) {
        // Toast.show('Some internal error', Toast.LONG);
        Alert.alert(
          "Internal error",
          "Some internal error",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
      
    }
      
    }else if(pass !== confPass){
      // Toast.show('Password and Confirm Password is not same', Toast.LONG);
      Alert.alert(
        "Invalid Input",
        "Password and Confirm Password is not same",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    else{
      // Toast.show('Please enter all fields', Toast.LONG);
      Alert.alert(
        "Invalid Input",
        "Please enter all fields",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    console.log("signup called", email)
  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
        </View>

        <Text
          style={{
            fontFamily: 'System',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        
        <Input placeholder='Full name' onChangeText={text => setName(text)}/>

<Input placeholder='Email ID' onChangeText={text => setEmail(text)}/>

<Input placeholder='Password' secureTextEntry={true} onChangeText={text => setPass(text)}/>

<Input placeholder='Confirm Password' secureTextEntry={true} onChangeText={text => setConfPass(text)}/>

        {/* <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date('2025-01-01')}
          minimumDate={new Date('1980-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}

        <CustomButton label={'Register'} onPress={signupCall} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
