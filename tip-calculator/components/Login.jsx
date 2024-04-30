import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, StyleSheet, Text, View, Alert, SafeAreaView, TextInput} from 'react-native';
import { readUsers } from '../database/users/readUsers'
import UserPool from '../database/users/userPool'

export default function Login() {

    const [userName, changeUserName] = useState("")
    const [password, changePassword] = useState("")
    const [confirmPassword, changeConfirmPassword] = useState("")


   function submitInput() {
      if(password == confirmPassword) {
        UserPool.signUp(userName, password, [], null, (err, data) =>{
          if(err) {
            console.error(err)
          }
          console.log(data)
        })
      }

   }


  return (
    <SafeAreaView>
        <TextInput 
            value = {userName}
            placeholder = "Enter User Name"
            onChangeText = {changeUserName}
        />

         <TextInput 
            value = {password}
            placeholder = "Enter Password"
            onChangeText = {changePassword}
        />

        <TextInput 
            value = {confirmPassword}
            placeholder = "Confirm Password"
            onChangeText = {changeConfirmPassword}
        />
        
        <Button 
            onPress = {submitInput}
            color = "#000"
        />


    </SafeAreaView>
  )
}
