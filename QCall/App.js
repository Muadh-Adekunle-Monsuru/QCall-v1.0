import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import More from "./screens/More";
import Home from "./screens/Home";
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTitleAlign: "center",
					headerStyle: { backgroundColor: "white" },
				}}
			>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Others" component={More} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EDEDE9",
	},
});
