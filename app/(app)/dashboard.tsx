import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DashboardScreen(){
    return(
     <View style={style.container}>
        <Card style={style.bigCard}>
            <View style={style.grid}>
            <Card style={style.card}>
                <SimpleLineIcons name="notebook" size={24} color="black" />
                <Text style={style.cardText}>Idea Notes</Text>
            </Card>

            <Card style={style.card}>
                <FontAwesome name="calendar-check-o" size={24} color="black" />
                <Text style={style.cardText}>Calender Check</Text>
            </Card>

            <Card style={style.card}>
                <MaterialCommunityIcons name="water-check" size={24} color="black" />
                <Text style={style.cardText}>Water Intake</Text>
            </Card>

            <Card style={style.card}>
                <Ionicons name="today-outline" size={24} color="black" />
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
       backgroundColor:"#ffffff",
       justifyContent:"center",
    },

    bigCard:{
       margin:1,
       marginBottom:40,
       padding:20,
       borderRadius:16,
       backgroundColor:"offwhitec",
       justifyContent:"center",
    },

    grid:{
         flexDirection:"row",
         flexWrap:"wrap",
         justifyContent:"space-between",
    },
    card:{
        width:"45%",
        height:140,
        marginBottom:40,
        borderRadius:12,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#6b4726",
        gap:6,

    },

    cardText:{
        color:"yellow",
        fontSize:16,
        fontWeight:"800",
        textAlign:"center",

    },
});