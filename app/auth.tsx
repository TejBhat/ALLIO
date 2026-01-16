import { useState } from "react";
import { KeyboardAvoidingView, Platform, View,StyleSheet} from "react-native";
import {Button, Card, Text, TextInput, useTheme} from "react-native-paper";
import {LinearGradient} from "expo-linear-gradient";



export default function AuthScreen(){

    const [isSignUp, setIsSignUp]=useState<boolean>(false);
    const [email, setEmail]=useState<string>("");
     const [password, setPassword ]=useState<string>("");
     const [error, setError]=useState<string | null>("");

     const theme=useTheme();

    const handleAuth= async()=>{
        if(!email || !password){
            setError("Please fill in all the fields");
            return;
        }
        if(password.length<6){
            setError("Password must be at least 6 characters long");
        }
        setError(null);
    };//this handleAuth function will take care of creating and signing In to an account, call it when user presses Sign In button

    const handleSwitchMode=()=>{
        setIsSignUp((prev)=>!prev);
    };
    return (
        <LinearGradient 
        colors={["#7a4a00","#5c3700"]} style={style.container}>

        <KeyboardAvoidingView behavior={Platform.OS==="android"?"padding":"height"} style={style.container}>

        <View style={style.content}>
            <Text style={style.appTitle}>ALLIO</Text>
            <Card style={style.card}>
                <Card.Content>
                 <Text style={style.title} variant="headlineMedium">{isSignUp? "Create Account":"Welcome Back"}</Text>
            <TextInput 
            label="Email" 
            autoCapitalize="none" 
            keyboardType="email-address" 
            placeholder="example@gmail.com"
            mode="outlined"
            outlineColor="#7a4a00"
            style={style.inputs}
            onChangeText={setEmail}// onchangetext when we try to input email
            />

             <TextInput 
            label="Password" 
            autoCapitalize="none" 
            keyboardType="email-address" 
            mode="outlined"
            outlineColor="#7a4a00"
            style={style.inputs}
            onChangeText={setPassword}
            />

            {error && <Text style={{color:theme.colors.error}}>{error}</Text>}

            <Button mode="contained"  onPress={handleAuth} style={style.button} labelStyle={style.buttontext}>{isSignUp? "Sign Up":"Sign In"}</Button>
            <Button mode="text" onPress={handleSwitchMode} style={style.switchModeButton} textColor="#7a4a00">{isSignUp?"Already have an account? Sign In":"Don't have an account? Sign Up"}</Button>
                
                </Card.Content>
                </Card>   
        </View>
    </KeyboardAvoidingView>
        </LinearGradient>

    );
}

const style=StyleSheet.create({
    container:{
             flex:1,
    },//container is for whole screen!

    content:{
        flex:1,
        padding:16,
        justifyContent:"center"
    },//content for the whole view of the screen

    appTitle:{
        textAlign:"center",
        fontSize:40,
        fontWeight:800,
        marginBottom:40,
        letterSpacing:2,
        color:"#ffd84d"

    },

    card:{
        paddingVertical:8,
        borderRadius:16,
        elevation:6,
        backgroundColor:"#ffffff"
    },

     title:{
       textAlign:"center",//brings the text in the center
       marginBottom:24, //some distance from inputs
       fontWeight:"800",
       color:"#5c3700",
    },//title for text Welcome Back

    inputs:{
       marginBottom:16,
    },

    button:{
        backgroundColor:"#ffd84d",
        marginTop:8,
        height:56,
        justifyContent:"center",
        

    },
    buttontext:{
        fontSize:18,
        color:"#5c3700",
        fontWeight:"800",
        letterSpacing:0.5,

    },

    switchModeButton:{
        marginTop:16,
    },
});