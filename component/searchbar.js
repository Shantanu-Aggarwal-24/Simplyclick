import React, {useState, useEffect, cloneElement} from 'react';
import {Text, View, StyleSheet, FlatList, BackHandler} from 'react-native';
import Constants from 'expo-constants';
import SearchBar from 'react-native-dynamic-search-bar';
// import Imageselect from './imageselect';
export default function Search({navigation}) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [heroes, setHeroes] = useState([]);
  const [show, setShow] = useState(false);
  const [test, settest] = useState(false);
  const [update, setupdate] = useState(false);
  const baseUrl = ""
  
  useEffect(() => {
    const backAction = () => {
      setShow(false);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const fetchData = async () => {
    const res = await fetch(baseUrl+'/property/data?filter='+query);
    const json = await res.json();
    // console.log("this is data", json);
    setData(json);
    // console.log(json);
    // console.log(json.slice());
   setHeroes(json);
  };
  useEffect(() => {
    fetchData();
  }, [update]);

  const filterNames = hero => {
    // 1.
    return hero.address;
    let search = query.toLowerCase();
    //2.
    // console.log("here")
    // if (hero.address.toLowerCase().startsWith(search)) {
    //   //3.
    //   // console.log("here1")
    //   return hero.address;
    // } else {
    //   //4.
    //   heroes.splice(heroes.indexOf(hero), 1);
    //   return null;
    // }
  };
  const updateQuery = async(input) => {
    setupdate(!update);
    setQuery(input);
    setShow(true);
    console.log("text-",input)
    // const res = await fetch(baseUrl+'/property/data?filter='+input);
    // const json = await res.json();
    // setData(json)
    // setHeroes(json)
    // console.log(query);
  };
  const handleKeyDown = event => {
    console.log('User pressed: ', event.key);

    // console.log(message);

    if (event.key === 'Backspace') {
      settest(true);
      console.log('Backspace key pressed ✅');
    }
  };
  return (
    <View style={styles.container}>
      {test && (
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone! Save to
          get a shareable url.
        </Text>
      )}

      <SearchBar
        fontColor="#c6c6c6"
        iconColor="#c6c6c6"
        shadowColor="#282828"
        cancelIconColor="#c6c6c6"
        // backgroundColor="#353d5e"
        placeholder="Search here"
        onChangeText={text => updateQuery(text)}
        onSearchPress={() => console.log('Search Icon is pressed')}
        onClearPress={() => {setShow(false);setQuery(""); console.log('Clear Icon is pressed');fetchData(); console.log(heroes)}}
        onKeyDown={() => handleKeyDown()}
      />

{show ? (
        <FlatList
          data={heroes}
          keyExtractor={i => i._id}
          extraData={query}
          renderItem={({item}) => (
            <Text
              style={styles.flatList}
              onPress={() =>
                navigation.navigate('Image', {
                  name: 'Jane',
                  item:item,
                })
              }>
              {filterNames(item)}
            </Text>
          )}
        />
      ):(
        <FlatList
          data={heroes}
          keyExtractor={i => i._id}
          extraData={query}
          renderItem={({item}) => (
            <Text
              style={styles.flatList}
              onPress={() =>
                navigation.navigate('Image', {
                  name: 'Jane',
                  item:item,
                })
              }>
              {filterNames(item)}
            </Text>
          )}
        />
      )}
      {/* <Imageselect></Imageselect> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatList: {
    paddingLeft: 15,
    marginTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    // borderBottomColor: '#26a69a',
    // borderBottomWidth:1
  },
});
