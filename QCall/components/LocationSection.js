import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";

var latitude = "";
var longitude = "";
export default function LocationSection() {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	let text = "Waiting...";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		latitude = location.coords.latitude;
		longitude = location.coords.longitude;
		text = JSON.stringify(location);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>Your latitude is:{latitude}</Text>
			<Text style={styles.paragraph}>Your longitude is: {longitude}</Text>
			{/* <Text style={styles.paragraph}> {text}</Text> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0.5,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#F5EBE0",
		borderRadius: 50,
		borderWidth: 2,
		borderBlockColor: "#D5BDAF",
	},
	paragraph: {
		fontSize: 18,
		textAlign: "center",
	},
});
