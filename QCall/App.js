import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Others from "./screens/Others";
import Home from "./screens/Home";
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		// <NavigationContainer>
		// 	<Stack.Navigator
		// 		screenOptions={{
		// 			headerTitleAlign: "center",
		// 			headerStyle: { backgroundColor: "white" },
		// 		}}
		// 	>
		// 		<Stack.Screen name="Home" component={Home} />
		// 		<Stack.Screen name="Others" component={More} />
		// 	</Stack.Navigator>
		// </NavigationContainer>
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={Home} />
				<Tab.Screen name="Others" component={Others} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EDEDE9",
	},
});
