import React, { useState, useEffect } from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Pressable,
	Alert,
} from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";

var latitude = "";
var longitude = "";
export default function LocationSection() {
	const [user, setUser] = React.useState([]);

	function fetchData() {
		const json = fetch("https://randomuser.me/api/?results=2")
			.then((response) => response.json())
			.then((data) => setUser(data));
		console.log(user.results[0].cell);
	}
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
			<Pressable style={styles.button} onPress={fetchData}>
				<Text style={styles.buttonText}>Get Data</Text>
			</Pressable>
			<Text style={styles.paragraph}>
				{/* Your longitude is: {user.results[0].name.first} */}
			</Text>
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
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginHorizontal: 60,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: "black",
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
});
