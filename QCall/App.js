import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/Welcome';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Welcome'
        screenOptions={{ headerStyle: { backgroundColor: '#FBDABB' } }}>  
              <Stack.Screen name='Welcome' component={Welcome} />
        </Stack.Navigator> 
    </NavigationContainer>
  );
}


