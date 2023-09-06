import React, { useState, useEffect } from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Pressable,
	Alert,
	Linking,
	AlertComponent,
} from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";

var latitude = "";
var longitude = "";
export default function LocationSection({ thelga, setTheLGA }) {
	const [location, setLocation] = useState(null);
	const [locationEnabled, setLocationEnabled] = useState(false);

	const [errorMsg, setErrorMsg] = useState(null);
	const [user, setUser] = useState(null); // Change initial state to null
	const [street, setStreet] = useState(""); // Initialize street state
	const [lga, setLga] = useState(""); // Initialize street state
	const [state, setState] = useState(""); // Initialize street state
	const [buttonActivation, setButtonActivation] = useState(false);
	const [buttonText, setButtonText] = useState("Waiting For Coordinates");

	const getIsFormValid = () => {
		return buttonActivation;
	};

	useEffect(() => {
		(async () => {
			const hasLocationServicesEnabled =
				await Location.hasServicesEnabledAsync();

			if (!hasLocationServicesEnabled) {
				Alert.alert(
					"Location Services Required",
					"Please enable location services on your device to use this app.",
					[
						{
							text: "Cancel",
							onPress: () => {
								setErrorMsg(
									"Location services are not enabled. \n Close the app!"
								);
							},
						},
						{
							text: "Open Settings",
							onPress: () => {
								Linking.openSettings();
							},
						},
					]
				);
				return;
			}
			/// Others
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				Alert.alert(errorMsg);
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			setButtonActivation(true);
			latitude = location.coords.latitude;
			longitude = location.coords.longitude;
			{
				handleClick();
			}
			// setButtonText("Get Address");
		})();
	}, []);

	const handleClick = () => {
		fetch(
			`https://api.opencagedata.com/geocode/v1/json?q=${latitude},+${longitude}&key=f7e47292a87f479bb355f49e907cce10&language=en&pretty=1&no_annotations=1`
		)
			.then((response) => response.json())
			.then((data) => {
				setUser(JSON.stringify(data));
				setStreet(data.results[0].formatted);
				setLga(data.results[0].components.county);
				setTheLGA(lga);
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
				<View style={{ flex: 1, justifyContent: "center" }}>
					{(user && <Text style={styles.nonEmphasised}>{street}</Text>) || (
						<Text style={styles.nonEmphasised}>Getting Street...</Text>
					)}
					{(user && <Text style={styles.emphsised}>{lga}</Text>) || (
						<Text style={styles.emphsised}>Getting LGA...</Text>
					)}
					{(user && <Text style={styles.nonEmphasised}>{state}</Text>) || (
						<Text style={styles.nonEmphasised}>Getting State...</Text>
					)}
				</View>
			</View>
			{/* <View style={{ flex: 0.2 }}>
				<Pressable
					style={getIsFormValid() ? styles.buttonE : styles.buttonD}
					onPress={handleClick}
					disabled={!getIsFormValid()}
				>
					<Text style={styles.buttonText}>{buttonText}</Text>
				</Pressable>
			</View> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0.4,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 25,
		paddingVertical: 20,
		backgroundColor: "#F5EBE0",
		borderRadius: 50,
		borderWidth: 1,
		borderColor: "#D5BDAF",
		margin: 10,
		marginHorizontal: 20,
	},
	blockHeading: {
		fontWeight: "bold",
		fontSize: 35,
		textAlign: "center",
	},
	nonEmphasised: {
		margin: 10,
		fontSize: 15,
		textAlign: "center",
	},
	emphsised: {
		margin: 5,
		fontSize: 70,
		textAlign: "center",
		fontWeight: "300",
	},
	buttonE: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 92,
		marginHorizontal: 10,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: "#D5BDA9",
	},
	buttonD: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 92,
		marginHorizontal: 10,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: "gray",
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
