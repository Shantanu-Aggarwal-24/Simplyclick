import React, {useState, useReducer, useRef, useEffect} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ScrollView,
  ActivityIndicator,
  Alert,
  Linking,
  Touchable,
  Pressable,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Text, Card, Button, Icon} from '@rneui/themed';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
// import CircularProgress from 'react-native-circular-progress-indicator'
const Imageselect = ({navigation, route}) => {
  const [filePath, setFilePath] = useState();
  const [data, setData] = useState(route.params.item);
  const [postData, setPostData] = useState();
  const [progv, setProgv] = useState(0);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [len, setLen] = useState(0);
  const [cam, setCam] = useState(false);
  //const [, forceUpdate] = useReducer(x => x + 1, 0);
  baseUrl = ""
  

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  //   console.log(filePath);

  const openURI = async dlink => {
    try {
      const url = dlink;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Url can't be opened....please restart the App");
      }
    } catch (err) {
      console.log('error from drive link open uri', err);
    }
  };

  const openPodio = async plink => {
    try {
      const url = plink;
      const supp = await Linking.canOpenURL(url);

      if (supp) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Url can't be opened..please restart the app");
      }
    } catch (er) {
      console.log('error from podio link open uri', er);
    }
  };

  var arr = [];
  var arr1 = [];
  var arr2 = [];

  const captureImage = async type => {
    // let options = {
    //   mediaType: type,
    //   maxWidth: 300,
    //   maxHeight: 550,
    //   quality: 1,
    //   videoQuality: 'low',
    //   durationLimit: 30, //Video max duration in seconds
    //   saveToPhotos: true,
    // };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    console.log('isCameraPermitted', isCameraPermitted);
    console.log('isStoragePermitted', isStoragePermitted);
    if (isCameraPermitted && isStoragePermitted) {
      console.log('this is working with camera permission');

      //IMAGE  PICKER CAMERA
      ImagePicker.openCamera({
        multiple: true,
        includeBase64: true,
        maxFiles: 100,
        compressImageQuality: 0.0001,
      }).then(image => {
        console.log(image);
        // image.forEach(item => {
        arr.push(image);
        arr2.push(image.path);
        console.log('------------------------------------------------', image);
        setFilePath(arr2);
        setPostData(arr);
        // });

        Alert.alert('Uploading..', 'Processing image to upload to drive', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

        setLen(image.length);
        image.forEach((item, index) => {
          setTimeout(function () {
            newAdd(item);
          }, 1000 * (index + 1));

          // arr.push(item);
          // arr2.push(item.path)
          // console.log("------------------------------------------------",item);
          // setFilePath(arr2);
          // setPostData(arr);
        });

        arr1.push(
          <View>
            <Text>verfvv</Text>
          </View>,
        );
      });

      // setCamera(true)
      // return <Camera />
    } else {
      console.log('this is NOT working with camera permission');
    }
  };

  const toastShow = () => {
    try {
      Toast.show({
        type: 'success',
        text1: 'File Uploaded successfully',
        // text2:'This is Something '
      });
    } catch (err) {
      console.log('error from toast ', err);
    }
  };

  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: '#90ee90',
          backgroundColor: '#90ee90',
          borderRadius: 22,
          marginTop: 550,
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 25,
          fontWeight: '400',
          color: '#ffffff',
        }}
      />
    ),

    error: props => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: '#ff0000',
          backgroundColor: '#ff0000',
          borderRadius: 22,
          marginTop: 550,
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color: '#ffffff',
        }}
      />
    ),
  };

  const chooseFile = async type => {
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
      maxFiles: 100,
      compressImageQuality: 0.0001,
    }).then(images => {
      Alert.alert('Uploading..', 'Processing images to upload to drive', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

      setLen(images.length);

      images.forEach((item, index) => {
        setTimeout(() => {
          newAdd(item);
        }, 1000 * (index + 1));

        // arr.push(item);
        // arr2.push(item.path)
        // console.log("------------------------------------------------",item);
        // setFilePath(arr2);
        // setPostData(arr);
      });

      arr1.push(
        <View>
          <Text>verfvv</Text>
        </View>,
      );
      // setTimeout(
      // addImage(),3000
      // )
    });
  };

  

  const createFormData = (photo, body) => {
    const data = new FormData();

    for (let i = 0; i < photo.length; i++) {
      data.append('files', {
        name: 'property_image',
        type: photo[i].mime,
        uri:
          Platform.OS === 'android'
            ? photo[i].path
            : photo[i].path.replace('file://', ''),
      });
    }

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  const newAdd = item => {
    // arr.push(item);
    // arr2.push(item.path)
    // console.log("------------------------------------------------",item);
    // setFilePath(arr2);
    // setPostData(arr);
    let formdata = createFormData([item], {
      drive_name: data.drive_name,
      propName: data.address,
    });
    console.log('formdata', formdata);

    var config = {
      method: 'post',
      url: baseUrl+'/upload_file',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data == 'FIle Uploaded') {
          setCount(count + 1);
        }
        setProgv(progv + 1);
        if (progv == len) {
          if (count == len) {
            console.log('count is qequal to number of images');
            toastShow();
            setCount(0);
            setLen(0);
          } else {
            console.log("file doesn't upload successfully!!");
            Toast.show({
              type: 'error',
              text1: `Error: ${count} out of ${len} files uploaded successfully `,
            });
            setCount(0);
            setLen(0);
          }
        }
        // setFilePath([]);
        // setPostData([]);
      })
      .catch(function (error) {
        console.log('error from axios', error);
        // Alert.alert(
        //   "Upload Images",
        //   "failed Image Upload>",
        //   [
        //     { text: "OK", onPress: () => console.log("OK Pressed") }
        //   ]
        // );
      });
  };

  

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage()}>
          <Text style={styles.textStyle}>Launch Camera for Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
       
        <Card>
          <Card.Title>Details</Card.Title>
          <Card.Divider />
          <Text style={styles.textStyle1}>Address: {data.address}</Text>

          <TouchableHighlight onPress={() => openURI(data.drive_name)}>
            <Text style={styles.textStyle1}>
              Drive Link:{' ' + data.drive_name}
              
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() =>
              openPodio(
                `https://podio.com/hsnnowcom/hsn-crm/apps/properties/items/${data.itemId}`,
              )
            }>
            <Text style={styles.textStyle1}>
              Podio Item Link:
              {' https://podio.com/hsnnowcom/hsn-crm/apps/properties/items/' +
                data.itemId}
            </Text>
          </TouchableHighlight>

          <Text style={styles.textStyle1}>Seller Name: {data.seller_name}</Text>
          <Text style={styles.textStyle1}>
            Seller Email: {data.seller_email.split(':')[1]}
          </Text>
          <Text style={styles.textStyle1}>
            Seller Phone: {data.seller_phone.split(':')[1]}
          </Text>
        </Card>
        
      </View>
      <Toast config={toastConfig} />
    </ScrollView>
  );
};

export default Imageselect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
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
  textStyle1: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    backgroundColor: '#4681f4',
    padding: 5,
    borderRadius: 13,
    // marginBottom: 1,
    marginTop: 5,
    width: 250,
    alignItems: 'center',
  },
  buttonStyleUp: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 13,
    // marginBottom: 1,
    marginTop: 5,
    width: 250,
    alignItems: 'center',
  },
  imageStyle: {
    width: '50%',
    height: '50%',
    // margin: 5,
    // flex: 1,
    // aspectRatio: 1,
  },
  scrollView: {
    marginHorizontal: 2,
  },
});
