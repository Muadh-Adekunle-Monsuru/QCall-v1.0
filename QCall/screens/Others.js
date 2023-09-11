import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import PageButton from "../components/PageButton";
import { createStackNavigator } from "@react-navigation/stack";
import Police from "../components/Police";
import Army from "../components/Army";
import LocalGov from "../components/LocalGov";
import StateGov from "../components/StateGov";
import OthersHompage from "../components/OthersHome";
const Stack = createStackNavigator();
export default function Others() {
	return (
		<View style={styles.container}>
			<Stack.Navigator
				screenOptions={{
					headerTitleAlign: "center",
					headerStyle: { backgroundColor: "white" },
				}}
			>
				<Stack.Screen name="Home-page" component={OthersHompage} />
				<Stack.Screen name="Army" component={Army} />
				<Stack.Screen name="Police" component={Police} />
				<Stack.Screen name="Local Government" component={LocalGov} />
				<Stack.Screen name="State Government" component={StateGov} />
			</Stack.Navigator>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
