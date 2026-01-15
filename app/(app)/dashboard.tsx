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
        
            <Pressable style={style.menuButton} onPress={toggleMenu}>
                <View style={style.menuIcon}>
                    <Octicons name="three-bars" size={28} color="#111827" />
                </View>
                
            </Pressable>
    
        {menuOpen && <Pressable style={style.overlay} onPress={toggleMenu}/>}

        <Animated.View style={[style.sideMenu,{transform:[{translateX:slide}]}]}>
            <Text style={[style.menuItems, style.firstMenuItem]}>Account</Text>
             <Text style={style.menuItems}>About ALLIO</Text>
            <Text style={style.menuItems}>Appearance</Text>
            <Text style={[style.menuItems,style.logout]}>Logout</Text>
        </Animated.View>
        <Card style={style.bigCard}>
            <View style={style.grid}>
            <Card style={style.card}>
                <SimpleLineIcons name="notebook" size={26} color="#ffd84d" />
                <Text style={style.cardText}>Idea Notes</Text>
            </Card>

            <Card style={style.card}>
                <FontAwesome name="calendar-check-o" size={26} color="#ffd84d" />
                <Text style={style.cardText}>Calendar Check</Text>
            </Card>

            <Card style={style.card}>
                <MaterialCommunityIcons name="water-check" size={26} color="#ffd84d" />
                <Text style={style.cardText}>Water Intake</Text>
            </Card>

            <Card style={style.card}>
                <Ionicons name="today-outline" size={26} color="#ffd84d" />
                <Text style={style.cardText}>Today/Overview</Text>
            </Card>
        </View>
        </Card>
        
     </View>
    );
}
const style=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingHorizontal: 20,
    
  },

  menuButton:{
    position:"absolute",
    top:50,
    left:20,
    zIndex:20,
  },
  menuIcon:{
     width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  bigCard:{
    flex:1,
    justifyContent:"center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal:4,
  },

  card: {
    width: "47%",
    height: 160,
    borderRadius: 20,
    backgroundColor: "#7a4a00",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  cardText: {
    marginTop: 12,
    color: "#ffd84d",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },

  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 220,
    height: "100%",
    backgroundColor: "#FFFFFF",
    paddingTop: 90,
    paddingHorizontal: 24,
    zIndex: 15,
    elevation: 12,
    shadowColor:"#000",
    shadowOffset:{width:2,height:0},
    shadowOpacity:0.1,
    shadowRadius:8,
  },

  menuItems: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 26,
    color: "#374151",
  },
  firstMenuItem:{
   marginTop:30,
  },

  logout: {
    color: "#DC2626",
    marginTop:1,
    fontSize:17,
    fontWeight:"700",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 5,
  },
});
