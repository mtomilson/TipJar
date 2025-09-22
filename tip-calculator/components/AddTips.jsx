import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, SafeAreaView, Image, View, Text } from 'react-native';
import { firestore } from "../firebase";
import { getFirestore, doc, setDoc } from "@firebase/firestore";
import Tesseract from 'tesseract.js';
import * as ImagePicker from 'expo-image-picker';
import {getAuth, signOut, onAuthStateChanged} from 'firebase/auth'
import picture from '../assets/images/tips.jpg'
import { LinearGradient } from 'expo-linear-gradient'

export default function AddTips() {
  const [creditTips, setCreditTips] = useState("");
  const [date, setDate] = useState("");
  const [netSales, setNetSales] = useState("");
  const [barSales, setBarSales] = useState("");
  const [grossSales, setGrossSales] = useState("");
  const [cashTips, setCashTips] = useState("");
  const [ocrResult, setOcrResult] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState({});
  const [userID, setUserID] = useState("")
  const auth = getAuth()
  const db = getFirestore()


  /**
   * handleOcr() will process the image in the use state
   * it uses tesseract to extract data from the image
   * sets that data to lines, then passes it into extractData()
   * where it will be parsed for the correct information
   */
  const handleOcr = async () => {

    const formData = new FormData()
    formData.append('image', {
      uri: image.uri,
      name:'photo.jpg',
      type: 'image/jpg'
    })

    try {
      if(!image) {
        console.log("NO IMAGE YET")
      } else {
        console.log(image.assets[0].uri)

      }
      const response = await fetch('http://192.168.1.155:3000/ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      })

      const data = await response.json()

      if(data.text) {
        console.log(data.text)
      }
      else {
        console.log("ERROR")
      }
      
    }
    catch (error) {
      console.log("Error: ", error)
    }




    // try {
    //   console.log("HELLO OCR IS WORKING")

    //   const { data } = await Tesseract.recognize(
    //     picture,
    //     'eng'
    //   );

      

    //   setOcrResult(data);
      
    //   let lines = ocrResult.lines
    //   console.log(lines)
    //   extractData(lines)
    // } catch (err) {
    //   console.error(err);
    //   setError("Failed to process the image");
    // }


  };

  // set up auth

  onAuthStateChanged(auth, (user) => {
    if(user) {
      setUserID(user.uid)
    }
  })



  const handleSave = async () => {
    const data = {
      creditTips,
      date,
      netSales,
      barSales,
      grossSales,
      cashTips,
    };

    console.log("userID", userID)

    try {
      if(date == "") {
        alert("cannot save, no date provided")
      }
      else {
        const userDocRef = doc(db, userID, date)
        await setDoc(userDocRef, data)
      }
    } catch (e) {
      console.log(e)
    }
  };

  // const handleUpload = async () => {
  //   try {
  //     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  //     if (!permissionResult.granted) {
  //       alert('Permission to access camera is required!');
  //       return;
  //     }

  //     let result = await ImagePicker.launchCameraAsync({
  //       cameraType: ImagePicker.CameraType.back,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });

  //     if (!result.cancelled) {
  //       setImage(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     alert("Error uploading image: " + error.message);
  //   }
  // };


  /**
   * handleUpload() will access the user's camera roll
   */
  const handleUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    })
    await setImage(result)

  }

  /**
   * extractData() will take in a paramter data, which is passed in from
   * handleOcr(), which is the data pulled from the image
   * this will parse the json and look for the data needed (e.g net sales, credit tips)
   * uses regex to look for numbers 
   */

  function extractData(data) {

    //extracts net sales from the data
    for(let i = 0; i < data.length; i++) {
     let word = "net"
     if(data[i].text.includes(word)) {
      let found = data[i].text
      const regex = /\$([\d,]+\.\d{2})/
      const match = found.match(regex)
      if(match) {
        setNetSales(match[1])
      }
     }
    }

    //extracts bar sales from the data
    for(let i = 0; i < data.length; i++) {
      let word = "Bar"
      if(data[i].text.includes(word)) {
       let found = data[i].text
       const regex = /\$([\d,]+\.\d{2})/
       const match = found.match(regex)
       if(match) {
        setBarSales(match[1])
       }
      }
     }

     //extracts non cash tips from the data 
     for(let i = 0; i < data.length; i++) {
      let word = "Non"
      if(data[i].text.includes(word)) {
       let found = data[i].text
       const regex = /\$([\d,]+\.\d{2})/
       const match = found.match(regex)
       if(match) {
        setCreditTips(match[1])
       }
      }
     }

     // extracts gross sales
     for(let i = 0; i < data.length; i++) {
      let word = "Gross"
      if(data[i].text.includes(word)) {
       let found = data[i].text
       const regex = /\$([\d,]+\.\d{2})/
       const match = found.match(regex)
       if(match) {
        setGrossSales(match[1])
       }
      }
     }
  }

  /**
   * handleSignOut() will sign the user out when clicked
   * will eventually need to be moved to different file 
   */

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          value={date}
          style={styles.textInput}
          onChangeText={setDate}
          placeholder="Enter A Date (ex. 04-24-2004)"
        />
        <TextInput
          value={cashTips}
          style={styles.textInput}
          onChangeText={setCashTips}
          placeholder="Enter Cash Tips"
        />
        <Text style={styles.textInput}>

          {creditTips}
        </Text>
        
      </View>
      <Button title="Save Tips" onPress={handleSave} />
      <Button title="Process Image" onPress={handleOcr} />
      <Button title="Upload Image" onPress={handleUpload} />
      <Button title="Logout" onPress={handleSignOut} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    margin: 12,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  tipImage: {
    height: 100,
    width: 100,
    marginTop: 16,
  },
  ocrResult: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#eee',
  },
  errorText: {
    color: 'red',
    marginTop: 16,
  },
});
