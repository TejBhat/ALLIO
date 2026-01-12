import { useState } from "react";
import { KeyboardAvoidingView, Platform, View,StyleSheet} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";


export default function AuthScreen(){

    const [isSignUp, setIsSignUp]=useState<boolean>(false);

    const handleAuth= async()=>{


    };//this handleAuth function will take care of creating and signing In to an account, call it when user presses Sign In button

    const handleSwitchMode=()=>{
        setIsSignUp((prev)=>!prev);
    };
    return (
    <KeyboardAvoidingView behavior={Platform.OS==="android"?"padding":"height"} style={style.container}>

        <View style={style.content}>
            <Text style={style.title} variant="headlineMedium">{isSignUp? "Create Account":"Welcome Back"}</Text>
            <TextInput 
            label="Email" 
            autoCapitalize="none" 
            keyboardType="email-address" 
            placeholder="example@gmail.com"
            mode="outlined"
            style={style.inputs}/>

             <TextInput 
            label="Password" 
            autoCapitalize="none" 
            keyboardType="email-address" 
            mode="outlined"
            style={style.inputs}/>

            <Button mode="contained" style={style.button} onPress={handleAuth}>{isSignUp? "Sign Up":"Sign In"}</Button>
            <Button mode="text" onPress={handleSwitchMode} style={style.switchModeButton}>{isSignUp?"Already have an account? Sign In":"Don't have an account? Sign Up"}</Button>
        </View>

    </KeyboardAvoidingView>
    );
}

const style=StyleSheet.create({
    container:{
             flex:1,
             backgroundColor:"#f5f5f5"
    },//container is for whole screen!

    content:{
        flex:1,
        padding:16,
        justifyContent:"center"
    },//content for the whole view of the screen

     title:{
       textAlign:"center",//brings the text in the center
       marginBottom:24, //some distance from inputs
    },//title for text Welcome Back

    inputs:{
       marginBottom:16,
    },

    button:{
       marginTop:8,
    },

    switchModeButton:{
        marginTop:16,
    },


});