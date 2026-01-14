import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export default function DashboardScreen(){
    return(
     <View style={style.container}>
        <Card style={style.bigCard}>
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
        </Card>
        
     </View>
    );
}
const style=StyleSheet.create({
    container:{
       flex:1,
       padding:18,
       backgroundColor:"#5e4522",
       justifyContent:"center",
    },
    bigCard:{
       padding:16,
       borderRadius:16,
       backgroundColor:"#b08848",
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
        marginBottom:18,
        borderRadius:16,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#7a4a00",
        elevation:4,

    },

    cardText:{
        color:"#ffd84d",
        fontSize:16,
        fontWeight:"800",
        textAlign:"center",

    },
});