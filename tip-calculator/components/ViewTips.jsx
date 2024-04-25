import React from 'react'
import { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View, Alert, SafeAreaView, TextInput} from 'react-native';
import { readTips } from '../database/tips/readTips'

export default function ViewTips() {
    const [date, setDate] = useState("")
    const [tips, setTips] = useState("")
    const [data, setData] = useState([])
    
    useEffect(() => {
        console.log("OnChange: " + data)

    }, [data])


    const styles = StyleSheet.create({

        TextInput: {
            height: 40,
            margin: 12,
            width: 250, 
            borderColor: "red"
        }
      })

      
      async function handleInput() {

         await setData(readTips(date))

        //  var data = readTips()
        //  console.log(date)
      
      }

  return (

    <SafeAreaView>
    <TextInput 
        value = {date}
        style = {styles.TextInput}
        onChangeText = {setDate}
        placeholder = "Enter A Date (ex. 04-24-2004)"
        
        />

    <Button 
        onPress = {handleInput}
    />

    <Text>
        hello
        {tips}
        {data}
        hello
    </Text>

    </SafeAreaView>
    
  )
}
