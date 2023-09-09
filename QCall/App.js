import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Others from "./screens/Others";
import Home from "./screens/Home";

import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName = "home";

						if (route.name === "Homepage") {
							iconName = focused ? "home" : "home-outline";
						} else if (route.name === "Others") {
							iconName = focused ? "ios-list" : "ios-list-outline";
						}

						// You can return any component that you like here!
						return <Ionicons name={iconName} size={24} color="black" />;
					},
					tabBarActiveTintColor: "tomato",
					tabBarInactiveTintColor: "gray",
				})}
			>
				<Tab.Screen name="Homepage" component={Home} />
				<Tab.Screen name="Others" component={Others} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
