// Example of Image Picker in React Native
// https://aboutreact.com/example-of-image-picker-in-react-native/

import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Import Image Picker
import Search from './component/searchbar';
import Imageselect from './component/imageselect';
import ImageAPI from './component/imagepanel';
const Home = () => {
  const Stack = createNativeStackNavigator();
  return (
    // <SafeAreaView style={{flex: 1}}>
    <SafeAreaProvider>
    {/* <NavigationContainer> */}
      <Stack.Navigator>
        {/* <Search/> */}
        {/* <Text>csdc</Text> */}
        <Stack.Screen name="Home" component={Search} />
        <Stack.Screen name="Image" component={Imageselect} />
      </Stack.Navigator>
    {/* </NavigationContainer> */}
    </SafeAreaProvider>
    // </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
