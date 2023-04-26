// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ==============================================================================
// import React from 'react';
// import {View,Text} from 'react-native'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Chat from './screens/Chat';
// import Home from './screens/Home';
// import Login from './screens/Login';
// import Signup from './screens/Signup';
// const Stack = createNativeStackNavigator();
// const App = ()=>{
//   return (
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{headerShown:false}} defaultScreenOptions={Home}>
//             <Stack.Screen name='Login' component={Login} />
//             <Stack.Screen name='Signup' component={Signup} />
//           	<Stack.Screen name='Home' component={Home} />
// 					  <Stack.Screen name='Chat' component={Chat} />
// 				  </Stack.Navigator>
//         </NavigationContainer>
//   );
// }

// export default App
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ==============================================================================

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { Provider } from "react-redux";
// import HomeScreen from "./screens2/HomeScreen";
// import StackNavigator from "./StackNavigator";
// import store from "./store";

// export default function App() {
//   return (
//     <Provider store={store}>
//       <StackNavigator />
//       <StatusBar style="auto" />
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//==============================================================================
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ==============================================================================
import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import MessagesScreen from './screens/MessagesScreen';
import { Provider } from "react-redux";
import store from "./store";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import StackNavigator from "./StackNavigator";
// import { StatusBar } from "expo-status-bar";
import HomeScreen from './screens2/HomeScreen';
import PickUpScreen from './screens2/PickUpScreen';
import CartScreen from './screens2/CartScreen';
import LoginScreen from './screens2/LoginScreen';
import RegisterScreen from './screens2/RegisterScreen';
import ProfileScreen from './screens2/ProfileScreen';
import OrderScreen from './screens2/OrderScreen';
import LandingScreen from './screens2/LandingScreen';
import Map from './components/Map';
import OnboardingScreen from './screens/OnboardingScreen';
import Splash from './screens/Splash';
import CustomTabBar from './components/CustomTabBar';
import CustomTabBarButton from './components/CustomTabBarButton';
import RequestsScreen from './screens2/RequestsScreen';
import CalendarScreen from './calendar/calendarScreen';
import AgendaScreen from './calendar/AgendaScreen';
import CalendarListScreen from './calendar/calendarListScreen';
import ExploreScreen from './screens2/ExploreScreen2';
// import MapScreen from './screens/MapScreen';
import LocationScreen from './screens/LocationScreen';
import { TailwindProvider } from 'tailwindcss-react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import { MaterialIcons } from "@expo/vector-icons";
import CustomDrawer from './components/CustomDrawer';
import Colors from './constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';





const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({});
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const AuthenticatedUserProvider = ({ children}) => {
  const [user, setUser] = useState(null);

return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function DrawerNavigator() {
  return (
      <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: Colors.white,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen name="Home" component={LandingScreen} options={{headerShown:false , title: 'Home',drawerIcon: ({focused, color, size}) => (<Icon name="home-outline" size={18} color={color} />),}}/>
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{headerShown:false , title: 'Profile',drawerIcon: ({focused, color, size}) => (<Icon name="person-circle-outline" size={18} color={color} />),}}/>
      <Drawer.Screen name="Requests" component={RequestsScreen} options={{headerShown:false, title: 'Requests',drawerIcon: ({focused, color, size}) => (<Icon name="albums-outline" size={18} color={color} /> ), }}/>
      <Drawer.Screen name="Messages" component={MessagesScreen} options={{headerShown:false , title: 'Messages',drawerIcon: ({focused, color, size}) => (<Icon name="chatbubbles-outline" size={18} color={color} />),}}/>
      <Drawer.Screen name="Explore" component={ExploreScreen} options={{headerShown:false, title: 'Explore',drawerIcon: ({focused, color, size}) => (<Icon name="planet-outline" size={18} color={color} />),}}/>
  </Drawer.Navigator>
  )
}

function ChatStack() {
  return (
  <Stack.Navigator >
 
      <Stack.Screen name="LandingScreen" component={DrawerNavigator} options={{headerShown:false }}/>
      <Stack.Screen name="ProfileScreen" component={DrawerNavigator} options={{headerShown:false }}/>
      <Stack.Screen name="RequestsScreen" component={DrawerNavigator} options={{headerShown:false }}/>
      <Stack.Screen name="MessagesScreen" component={DrawerNavigator} options={{headerShown:false }}/>
      <Stack.Screen name="ExploreScreen" component={DrawerNavigator} options={{headerShown:false}}/>
      {/* -------------------------------------------------------------------------------------- */}
      <Stack.Screen name="LocationScreen" component={LocationScreen} options={{headerShown:false}} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
      <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}} />
      <Stack.Screen name="Map" component={Map} options={{headerShown:false}} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
      <Stack.Screen name="PickUp" component={PickUpScreen} options={{headerShown:false}} />
      <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}} />
      <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}} />
  </Stack.Navigator>
  );
}


// options={{
//           tabBarIcon: ({ color }) => (<MaterialIcons name="home" color={color} size={26} />)
//           }}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
      <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
      <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
// unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TailwindProvider>
          <SafeAreaProvider>
         {user ? <ChatStack /> : <AuthStack />} 
         </SafeAreaProvider>
         </TailwindProvider> 
      </NavigationContainer>
    </Provider>
    );
  }

  export default function App() {
    return (
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
    );
  }
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ==============================================================================
//   import "intl";
// import "intl/locale-data/jsonp/en";

// import { KeyboardAvoidingView, Platform } from "react-native";
// import { TailwindProvider } from 'tailwindcss-react-native';

// import HomeNavigation from "./components/HomeNavigation";
// import { NavigationContainer } from "@react-navigation/native";
// import { Provider } from "react-redux";
// import React from "react";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { store } from "./app/store";
// import MapScreen from "./screens/MapScreen";
// import OnboardingScreen from "./screens/OnboardingScreen";
// import OtpScreen from "./screens/OtpScreen";
// import ClientRegistrationForm from "./components/RegistrationForm";



// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//          <TailwindProvider>
//           <SafeAreaProvider>
//             <KeyboardAvoidingView
//               behavior={Platform.OS === "ios" ? "padding" : "height"}
//               keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
//               style={{ flex: 1 }}
//             >
//                <HomeNavigation /> 
//               {/* <MapScreen/>  */}
//               {/* <OnboardingScreen/> */}
//               {/* <OtpScreen/>
//               <ClientRegistrationForm/> */}
            
//             </KeyboardAvoidingView>
//           </SafeAreaProvider>
//         </TailwindProvider>
//       </NavigationContainer>
//     </Provider>
//   );
// }

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ==============================================================================
// TINDER CLONE
// TINDER CLONE
// TINDER CLONE
// TINDER CLONE
// TINDER CLONE
// TINDER CLONE
// TINDER CLONE
// TINDER CLONE

// import React from 'react';
// import {View,Text} from 'react-native'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import HomeScreen from "./containers/Home";
// import MatchesScreen from "./containers/Matches";
// import MessagesScreen from "./containers/Messages";
// import ProfileScreen from "./containers/Profile";
// import Icon from "./components/Icon";
// import styles from "./assets/styles"

// const Tab = createBottomTabNavigator();
// function App() {
//   return (
// 	<NavigationContainer>
// 		<Tab.Navigator>
// 		<Tab.Screen name="Explore" component={HomeScreen} />
// 		<Tab.Screen name="Matches" component={MatchesScreen} />
// 		<Tab.Screen name="Chat" component={MessagesScreen} />
// 		<Tab.Screen name="Profile" component={ProfileScreen} />
// 		</Tab.Navigator>
// 	</NavigationContainer>
//   );
// }

// export default App
// =================================================================================





