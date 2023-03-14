import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#4681f4',
        padding: 20,
        borderRadius: 13,
        marginBottom: 10,
        // width: 250,
        alignItems: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
