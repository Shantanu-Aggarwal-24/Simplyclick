import React,{useState,useEffect,useContext} from 'react';
import {View,ActivityIndicator} from "react-native"
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import AuthStack from './src/navigation/AuthStack';
// import AppStack from './src/navigation/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/navigation/Authcontext'
// import AppStack from './src/navigation/AppStack';
function AppNav() {
  const {user ,isloading} =useContext(AuthContext);
console.log("usr",user)
  if(isloading)
  {<View><ActivityIndicator size={"large"}/></View>}
  return (
   
    <NavigationContainer>
      
     {user!==null ?(<Home/>):(<AuthStack/>)}
    
    </NavigationContainer> 
   
  );
}

export default AppNav;