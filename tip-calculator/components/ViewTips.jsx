import React from 'react'
import { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View, Alert, SafeAreaView, TextInput} from 'react-native';
import { readTips, tipData } from '../database/tips/readTips'

export default function ViewTips() {
    const [date, setDate] = useState("")
    const [data, setData] = useState([])
    const [cashTips, setCashTips] = useState("")
    const [creditTips, setCreditTips] = useState("")
    const [netSales, setNetSales] = useState("")


    var JSONdata // stores the data from readtips.js 



    const styles = StyleSheet.create({

        TextInput: {
            height: 40,
            margin: 12,
            width: 250, 
            borderColor: "red"
        }
      })

      
      async function handleInput() {
        var fetchedData
        fetchedData = await readTips(date)
        setData(fetchedData)

        console.log("from viewtips" + fetchedData)
        JSONdata = JSON.parse(fetchedData) // parses it because i returned it as a string
        console.log(JSONdata)
        setCashTips(JSONdata.Item.CashTips)
        setCreditTips(JSONdata.Item.CreditTips)
        setNetSales(JSONdata.Item.NetSales)

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
        Cash Tips: {cashTips}
        Credit Tips: {creditTips}
        Net Sales: {netSales}
    </Text>

    </SafeAreaView>
    
  )
}
