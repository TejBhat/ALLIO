import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";

export default function DashboardScreen(){
      const { currentTheme, toggleTheme } = useTheme();
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
     <View style={[style.container, { backgroundColor: currentTheme.backgroundColor }]}>
        
            <Pressable style={style.menuButton} onPress={toggleMenu}>
                <View style={style.menuIcon}>
                    <Octicons name="three-bars" size={28} color="#111827" />
                </View>
                
            </Pressable>
    
        {menuOpen && <Pressable style={style.overlay} onPress={toggleMenu}/>}

        <Animated.View style={[style.sideMenu, { backgroundColor: currentTheme.menuBackground, transform:[{translateX:slide}]}]}>
            <Pressable onPress={() => {
                toggleMenu();
                router.push("/account");
            }}>
                <Text style={[style.menuItems, style.firstMenuItem, { color: currentTheme.menuText }]}>Account</Text>
            </Pressable>
            <Pressable onPress={() => {
                toggleMenu();
                router.push("/about");
            }}>
                <Text style={[style.menuItems, { color: currentTheme.menuText }]}>About ALLIO</Text>
            </Pressable>
            <Pressable onPress={() => {
                toggleTheme();
                toggleMenu();
            }}>
                <Text style={[style.menuItems, { color: currentTheme.menuText }]}>Theme</Text>
            </Pressable>
            <Pressable onPress={() => {
                toggleMenu();
                router.push("/");
            }}>
                <Text style={[style.menuItems,style.logout, { color: currentTheme.menuText }]}></Text>
            </Pressable>
        </Animated.View>
        
            <View style={style.content}>
                  <View style={style.grid}>
                    <Pressable style={style.cardContainer} onPress={()=>router.push("/notes")}>
                        <Card style={[style.card, { backgroundColor: currentTheme.cardBackground }]}>
                <SimpleLineIcons name="notebook" size={26} color={currentTheme.accentColor} />
                <Text style={[style.cardText, { color: currentTheme.accentColor }]}>Idea Notes</Text>
            </Card>
                </Pressable>
                <Pressable style={style.cardContainer} onPress={()=>router.push("/calendarcheck")}>
                    <Card style={[style.card, { backgroundColor: currentTheme.cardBackground }]}>
                <FontAwesome name="calendar-check-o" size={26} color={currentTheme.accentColor} />
                <Text style={[style.cardText, { color: currentTheme.accentColor }]}>Calendar Check</Text>
            </Card>
                </Pressable>
            
            <Pressable style={style.cardContainer} onPress={()=>router.push("/waterintake")}>
                <Card style={[style.card, { backgroundColor: currentTheme.cardBackground }]}>
                <MaterialCommunityIcons name="water-check" size={26} color={currentTheme.accentColor} />
                <Text style={[style.cardText, { color: currentTheme.accentColor }]}>Water Intake</Text>
            </Card>
            </Pressable>

          <Pressable style={style.cardContainer} onPress={()=>router.push("/overview")}>
          <Card style={[style.card, { backgroundColor: currentTheme.cardBackground }]}>
                <Ionicons name="today-outline" size={26} color={currentTheme.accentColor} />
                <Text style={[style.cardText, { color: currentTheme.accentColor }]}>Daily Overview</Text>
            </Card>
         </Pressable>
            
        </View>
            </View>
     </View>
    );
}
const style=StyleSheet.create({
  container: {
    flex: 1,
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  content:{
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
    width: "100%",
    height:170,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardContainer:{
    width:"47%",
    marginBottom:22,
  },

  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 220,
    height: "100%",
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
  },
  firstMenuItem:{
   marginTop:30,
  },

  logout: {
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