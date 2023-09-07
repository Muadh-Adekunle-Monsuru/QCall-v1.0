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
	Button,
} from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LocationSection() {
	const [location, setLocation] = useState(null);
	const [buttonActivation, setButtonActivation] = useState(false);
	const [locationEnabled, setLocationEnabled] = useState(false);
	const [responseData, setResponseData] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [user, setUser] = useState(null); // Change initial state to null
	const [street, setStreet] = useState(""); // Initialize street state
	const [lga, setLga] = useState(""); // Initialize street state
	const [state, setState] = useState(""); // Initialize street state
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [buttonText, setButtonText] = useState("Waiting For Coordinates");

	const getIsFormValid = () => {
		return buttonActivation;
	};
	useEffect(() => {
		(async () => {
			try {
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

				const { status } = await Location.requestForegroundPermissionsAsync();

				if (status !== "granted") {
					setErrorMsg("Permission to access location was denied");
					Alert.alert(errorMsg);
					return;
				}
				const getLocation = async () => {
					console.log("Get location is called");
					const locationData = await Location.getCurrentPositionAsync({})
						.then((response) => {
							setLocation(locationData);
						})
						.then((data) => {
							console.log(data);
							setLatitude(data.coords.latitude);
							setLongitude(data.coords.longitude);
							setButtonActivation(true);
							setButtonText("Get");
						})
						.catch((error) => {
							console.error("fetching data:", error);
						});
				};
				getLocation();
			} catch (error) {
				console.error("Error getting location:", error);
			}
		})();
	}, []);

	const handleClick = async () => {
		try {
			const response = await fetch(
				`https://api.opencagedata.com/geocode/v1/json?q=${latitude},+${longitude}&key=f7e47292a87f479bb355f49e907cce10&language=en&pretty=1&no_annotations=1`
			);
			const data = await response.json();

			if (response.ok) {
				setUser(JSON.stringify(data));
				setStreet(data.results[0].formatted);
				setLga(data.results[0].components.county);
				setState(data.results[0].components.state);
				{
					fetchData();
				}
				// Call the next function here, e.g., fetchData();
			} else {
				console.error("Error fetching data:", data);
				Alert.alert("Error fetching data:", data);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			Alert.alert("Error fetching data:", error.message);
		}
	};

	const fetchData = async () => {
		try {
			const response = await fetch(
				`https://sheetdb.io/api/v1/sc073hiofw97m/search?lganame=${lga}&sheet=data`
			)
				.then((response) => {
					// Check if the response is successful (status code 200)
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					// Parse the response JSON data
					return response.json();
				})
				.then((data) => {
					console.log(data);
					setResponseData(data);
				});
		} catch (error) {
			console.error("Error fetching contacts from database:", error);
		}
	};
	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container1}>
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
				<View style={{ flex: 0.2 }}>
					<Pressable
						style={getIsFormValid() ? styles.buttonE : styles.buttonD}
						onPress={handleClick}
						disabled={!getIsFormValid()}
					>
						<Text style={styles.buttonText}>{buttonText}</Text>
					</Pressable>
				</View>
			</View>
			<View style={styles.container2}>
				<Text style={styles.blockHeading}>Emergency Type:</Text>
				<View style={{ flex: 0.9, justifyContent: "space-evenly" }}>
					{responseData && (
						<View>
							<Pressable
								style={[
									styles.pills,
									{
										backgroundColor: "#ffe5d9",
										borderColor: "#f4acb7",
									},
								]}
								onPress={() =>
									Linking.openURL(`tel:${JSON.stringify(responseData[0].fire)}`)
								}
							>
								<FontAwesome name="fire" size={24} color="black" />
								<Text>Fire:</Text>
								<Text>{responseData[0].fire}</Text>
							</Pressable>
							<Pressable
								style={[
									styles.pills,
									{ backgroundColor: "#ccd5ae", borderColor: "#e9edc9" },
								]}
								onPress={() =>
									Linking.openURL(
										`tel:${JSON.stringify(responseData[0].medical)}`
									)
								}
							>
								<FontAwesome5 name="clinic-medical" size={24} color="black" />
								<Text>Medical :</Text>
								<Text> {responseData[0].medical}</Text>
							</Pressable>
							<Pressable
								style={[
									styles.pills,
									{ backgroundColor: "#bde0fe", borderColor: "#a2d2ff" },
								]}
								onPress={() =>
									Linking.openURL(
										`tel:${JSON.stringify(responseData[0].police)}`
									)
								}
							>
								<MaterialCommunityIcons
									name="police-badge"
									size={24}
									color="black"
								/>
								<Text>Police:</Text>
								<Text>{responseData[0].police}</Text>
							</Pressable>
						</View>
					)}
				</View>
				<View style={{ flex: 0.1 }}>
					<Button title="Show More +" onPress={handleClick} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container1: {
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
	container2: {
		flex: 0.6,
		alignItems: "center",
		// justifyContent: "center",
		paddingHorizontal: 25,
		paddingVertical: 20,
		backgroundColor: "#F5EBE0",
		borderRadius: 50,
		borderWidth: 1,
		borderColor: "#D5BDAF",
		margin: 10,
		marginHorizontal: 20,
	},
	pills: {
		fontSize: 25,
		borderRadius: 30,
		paddingHorizontal: 95,
		paddingVertical: 30,
		borderWidth: 1,
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
});
