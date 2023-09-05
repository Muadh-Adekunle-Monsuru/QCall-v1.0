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
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [user, setUser] = useState(null); // Change initial state to null
	const [street, setStreet] = useState(""); // Initialize street state
	const [lga, setLga] = useState(""); // Initialize street state
	const [state, setState] = useState(""); // Initialize street state

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
		Alert.alert(errorMsg);
	} else if (location) {
		latitude = location.coords.latitude;
		longitude = location.coords.longitude;
		text = JSON.stringify(location);
	}

	const handleClick = () => {
		fetch(
			`https://api.opencagedata.com/geocode/v1/json?q=${latitude},+${longitude}&key=f7e47292a87f479bb355f49e907cce10&language=en&pretty=1&no_annotations=1`
		)
			.then((response) => response.json())
			.then((data) => {
				setUser(JSON.stringify(data));
				setStreet(data.results[0].formatted);
				setLga(data.results[0].components.county);
				setState(data.results[0].components.state);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};
	return (
		<View style={styles.container}>
			<View style={{ flex: 0.8 }}>
				<Text style={styles.blockHeading}>Location</Text>
				{(user && <Text style={styles.nonEmphasised}>{street}</Text>) || (
					<Text style={styles.nonEmphasised}>Street</Text>
				)}
				{(user && <Text style={styles.emphsised}>{lga}</Text>) || (
					<Text style={styles.emphsised}>LGA</Text>
				)}
				{(user && <Text style={styles.nonEmphasised}>{state}</Text>) || (
					<Text style={styles.nonEmphasised}>State</Text>
				)}
			</View>
			<View style={{ flex: 0.2 }}>
				<Pressable style={styles.button} onPress={handleClick}>
					<Text style={styles.buttonText}>Get Location</Text>
				</Pressable>
			</View>
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
		borderColor: "#D5BDAF",
	},
	blockHeading: {
		fontWeight: "bold",
		fontSize: 35,
		textAlign: "center",
	},
	nonEmphasised: {
		margin: 10,
		fontSize: 10,
		textAlign: "center",
	},
	emphsised: {
		margin: 5,
		fontSize: 30,
		textAlign: "center",
		fontWeight: "300",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginHorizontal: 60,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: "#D5BDAF",
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
	text: {
		marginTop: 20,
		fontSize: 18,
		textAlign: "center",
	},
});
