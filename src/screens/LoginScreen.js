import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import {AuthContext} from '../navigation/Authcontext';
import { Input, Icon } from '@rneui/themed';
const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const updateQuery = input => {
    setQuery(input);
  };
  const updateQuery1 = input => {
    setQuery1(input);
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
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
          Login
        </Text>

        <Input placeholder='Email ID' onChangeText={text => setEmail(text)}/>
<Input placeholder="Password" secureTextEntry={true} onChangeText={text => setPass(text)} />
        <CustomButton label={'Login'} onPress={() => login(email,pass)} />
        
       

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#AD40AF'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
