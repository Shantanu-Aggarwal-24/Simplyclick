import React,{useState,useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import AppNav from './AppNav';
// import AppStack from './src/navigation/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider} from './src/navigation/Authcontext'
function App() {
 
 
  return (
    <AuthProvider>
    <AppNav/>
    </AuthProvider>
  );
}

export default App;