import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, SafeAreaView, Image, View, Text } from 'react-native';
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";
import Tesseract from 'tesseract.js';
import * as ImagePicker from 'expo-image-picker';
import {getAuth, signOut} from 'firebase/auth'


export default function AddTips() {
  const [creditTips, setCreditTips] = useState("");
  const [date, setDate] = useState("");
  const [netSales, setNetSales] = useState("");
  const [barSales, setBarSales] = useState("");
  const [grossSales, setGrossSales] = useState("");
  const [cashTips, setCashTips] = useState("");
  const [ocrResult, setOcrResult] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const auth = getAuth()
  const ref = collection(firestore, "tipdata");

  const handleOcr = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }
    try {
      const { data } = await Tesseract.recognize(
        image,
        'eng'
      );

      console.log("Ehello")

      setOcrResult(data);
      
      let lines = ocrResult.lines
      console.log("Ehello")
      console.log(lines)
      extractData(lines)
    } catch (err) {
      console.error(err);
      setError("Failed to process the image");
    }


  };



  const handleSave = async () => {
    const data = {
      creditTips,
      date,
      netSales,
      barSales,
      grossSales,
      cashTips,
    };

    try {
      await addDoc(ref, data);
      alert('Data saved successfully');
    } catch (e) {
      console.log(e);
      setError("Failed to save data");
    }
  };

  const handleUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access camera is required!');
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
    }
  };



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

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.tipImage}
        />
      )}
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
