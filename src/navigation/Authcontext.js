import * as React from 'react';
// import Toast from 'react-native-simple-toast';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

import {  Alert
} from 'react-native';

export const AuthContext = React.createContext();


 export const AuthProvider=({children})=>{
    const [isloading,setisLoading]=React.useState(true)
    const [user,setUser]=React.useState(null)
    const baseUrl = ""
    async function login(email,pass){
console.log("inside authconrext")
console.log(email,pass)
        // React.useEffect(()=>{
          if(email && pass){
            try {
              let user = await fetch(baseUrl+'/login', { method : 'POST',   headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email : email, password : pass }) })
              console.log(user);
              user = await user.json();
              console.log(user);
              if(user.data){
                setisLoading(false)
                setUser(email)
                AsyncStorage.setItem('email',email)
                const eml = await AsyncStorage.getItem('email')
                console.log('the email is set in localstorage is',eml)
              }else{
                Alert.alert(
                  "Invalid Input",
                  "Email or Password is not valid",
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
              }
            } catch (error) {
              // Toast.show('Email or Password is not valid', Toast.LONG);
              Alert.alert(
                "Invalid Input",
                "Email or Password is not valid",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            }
          }else{
            // Toast.show('Please enter Email and Password', Toast.LONG);
            Alert.alert(
              "Invalid Input",
              "Please enter Email and Password",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }
    }
    function signup(email, password){
      setisLoading(false)
      setUser(email)
    }
  return (
    <AuthContext.Provider value={{login,user,isloading,signup}}>
      {children}
    </AuthContext.Provider>
  );
}
