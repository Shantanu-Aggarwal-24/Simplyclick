import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { Image,Text } from '@rneui/themed';

const BASE_URI = 'https://source.unsplash.com/random?sig=';

const ImageAPI = (props) => {
    console.log("propdataas",'"'+props.data+'"')
return (
  // <>
  // <SafeAreaView>
      <FlatList
        data={[...new Array(1)].map((_, i) => i.toString())}
        style={styles.list}
        numColumns={1}
        keyExtractor={(e) => e}
        renderItem={({ item }) => (
          <Image
            // source={{ uri:BASE_URI + item  }}
            source={{uri:props.data}}
            containerStyle={styles.item}
            PlaceholderContent={<ActivityIndicator />}
          />
        )}
      />
  //   {/* </SafeAreaView>
  // </> */}
);
};

const styles = StyleSheet.create({
list: {
  width: '50%',
//   backgroundColor: '#000',
  height:"50%"
},
item: {
  aspectRatio: 1,
//   width: '50%',
  flex: 1,
  width: "100%",
  height: "100%",
//   margin: 5,
},
});

export default ImageAPI;