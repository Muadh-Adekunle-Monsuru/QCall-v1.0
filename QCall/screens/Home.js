import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import LocationSection from "../components/LocationSection";
import MoreEm from "../components/MoreEm";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
const Stack = createStackNavigator();
export default function Home() {
	return (
		<View style={styles.container}>
			{/* <LocationSection navigation={navigation} /> */}
			<Stack.Navigator
				screenOptions={{
					headerTitleAlign: "center",
					headerStyle: { backgroundColor: "white" },
				}}
			>
				<Stack.Screen
					name="Home"
					component={LocationSection}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="More Emergencies" component={MoreEm} />
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
