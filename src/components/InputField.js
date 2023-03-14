import React,{useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  const [query1, setQuery1] = useState("");
  const [query, setQuery] = useState("");
  const updateQuery = async(input) => {
    await AsyncStorage.setItem('pass', query1)
    setQuery(input);

  };
  const updateQuery1 = async(input )=> {
    await AsyncStorage.setItem('uid',query)
    setQuery1(input);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
        onChangeText={text => updateQuery(text)}
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          onChangeText={text => updateQuery1(text)}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#AD40AF', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
