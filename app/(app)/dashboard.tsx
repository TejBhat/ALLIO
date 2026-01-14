import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export default function DashboardScreen(){
    return(
     <View style={style.container}>
        <View style={style.grid}>
            <Card>
                <Text>Idea Notes</Text>
            </Card>

            <Card>
                <Text>Calender Check</Text>
            </Card>

            <Card>
                <Text>Water Intake</Text>
            </Card>

            <Card>
                <Text>Today/Overview</Text>
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
});