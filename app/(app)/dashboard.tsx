import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export default function DashboardScreen(){
    return(
     <View style={style.container}>
        <View style={style.grid}>
            <Card style={style.card}>
                <Text style={style.cardText}>Idea Notes</Text>
            </Card>

            <Card style={style.card}>
                <Text style={style.cardText}>Calender Check</Text>
            </Card>

            <Card style={style.card}>
                <Text style={style.cardText}>Water Intake</Text>
            </Card>

            <Card style={style.card}>
                <Text style={style.cardText}>Today/Overview</Text>
            </Card>
        </View>
     </View>
    );
}
const style=StyleSheet.create({
    container:{
       flex:1,
       padding:16,
       backgroundColor:"#fffaf3",
       justifyContent:"center",
    },
    grid:{
         flexDirection:"row",
         flexWrap:"wrap",
         justifyContent:"space-between",
    },
    card:{
        width:"47%",
        height:140,
        marginBottom:16,
        borderRadius:16,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fffaf3",
        elevation:4,

    },

    cardText:{
        color:"#7a4a00",
        fontSize:16,
        fontWeight:"700",
        textAlign:"center",

    },
});