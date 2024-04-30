import React from 'react'
import { useState } from 'react'
import { Button, StyleSheet, Text, View, Alert, SafeAreaView, TextInput} from 'react-native';
import { writeTips } from '../database/tips/writeTips'





export default function AddTips() {
    const [creditTips, setCreditTips] = useState("")
    const [date, setDate] = useState("")
    const [netSales, setNetSales] = useState("")
    const [barSales, setBarSales] = useState("")
    const [grossSales, setGrossSales] = useState("")
    const [cashTips, setCashTips] = useState("")

    function runTips() {
        writeTips(creditTips, date, netSales, barSales, grossSales, cashTips)
    }

    const styles = StyleSheet.create({

        TextInput: {
            height: 40,
            margin: 12,
            width: 250, 
            borderColor: "red"
        }
      })

  return (
    <SafeAreaView>
        <Button 
            onPress = {runTips}
        />
        <TextInput 
        value = {creditTips}
        style = {styles.TextInput}
        onChangeText = {setCreditTips}
        placeholder = "Enter Credit Tips"
        
        />
        <TextInput 
        value = {date}
        style = {styles.TextInput}
        onChangeText = {setDate}
        placeholder = "Enter A Date (ex. 04-24-2004)"
        
        />
        <TextInput 
        value = {netSales}
        style = {styles.TextInput}
        onChangeText = {setNetSales}
        placeholder = "Enter Net Sales"
        
        />
        <TextInput 

        value = {barSales}
        style = {styles.TextInput}
        onChangeText = {setBarSales}
        placeholder = "Enter Bar Sales"
        
        />
        <TextInput 

        value = {grossSales}
        style = {styles.TextInput}
        onChangeText = {setGrossSales}
        placeholder = "Enter Gross Sales"
        
        />
        <TextInput 

        value = {cashTips}
        style = {styles.TextInput}
        onChangeText = {setCashTips}
        placeholder = "Enter Cash Tips"

        />

    </SafeAreaView>
  )
}
