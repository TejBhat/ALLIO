import { View, Text, StyleSheet, Pressable, Animated} from "react-native";
import { Card } from "react-native-paper";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import { useRef,useState } from "react"; 

export default function DashboardScreen(){
      const [menuOpen, setMenuOpen]=useState(false);
      const slide=useRef(new Animated.Value(-260)).current;
      
      const toggleMenu=()=>{
        Animated.timing(slide,{
            toValue:menuOpen?-260:0,
            duration:250,
            useNativeDriver:true,
        }).start();
        setMenuOpen(!menuOpen);
      };


    return(
     <View style={style.container}>
        <View style={style.header}>
            <Pressable onPress={toggleMenu}>
                <Octicons name="three-bars" size={24} color="black" />
            </Pressable>
        </View>
        <Animated.View style={[style.sideMenu,{transform:[{translateX:slide}]},]}>
            <Text style={style.menuItems}>Account</Text>
             <Text style={style.menuItems}>About ALLIO</Text>
            <Text style={style.menuItems}>Appearance</Text>
            <Text style={[style.menuItems,{color:"red"}]}>Logout</Text>
        </Animated.View>
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

    header:{
    alignItems:"flex-start",
    marginBottom:16,
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

    sideMenu:{
        position:"absolute",
        top:0,
        left:0,
        width:260,
        height:"100%",
        backgroundColor:"#f7f3ee",
        paddingTop:80,
        paddingHorizontal:20,
        zIndex:10,
        elevation:10,
    },
    menuItems:{
       fontSize:18,
       fontWeight:"600",
       marginBottom:24,
       color:"#333",
    },
});