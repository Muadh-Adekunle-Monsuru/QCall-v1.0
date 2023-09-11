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
import axios from "axios";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

var latitude = " ";
var longitude = "";
var myResponse;
export default function LocationSection({ navigation }) {
	const [location, setLocation] = useState(null);
	const [buttonActivation, setButtonActivation] = useState(false);
	const [locationEnabled, setLocationEnabled] = useState(false);
	const [responseData, setResponseData] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [user, setUser] = useState(null); // Change initial state to null
	const [street, setStreet] = useState(""); // Initialize street state
	const [lga, setLga] = useState(""); // Initialize street state
	const [state, setState] = useState(""); // Initialize street state
	const [buttonText, setButtonText] = useState("Waiting For Coordinates");
	const [showMore, setShowMore] = useState(false);
	const getIsFormValid = () => {
		return buttonActivation;
	};
	const isShowMoreValid = () => {
		return showMore;
	};
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			setButtonActivation(true);
			setButtonText("Get Address");
		})();
	}, []);
	let text = "Waiting...";
	if (errorMsg) {
		Alert.alert(errorMsg);
	} else if (location) {
		// Alert.alert("Cooredinated Gotten");
		//
		latitude = location.coords.latitude;
		longitude = location.coords.longitude;
		text = JSON.stringify(location);
	}
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
					fetchData(data.results[0].components.county);
				}
			} else {
				console.error("Error fetching data:", data);
				Alert.alert("Error fetching data:", data);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			Alert.alert("Error fetching data", error.message);
		}
	};

	const fetchData = (prop) => {
		let encodedLGA = encodeURIComponent(prop); // Encode spaces as %20
		axios
			.get(
				`https://sheetdb.io/api/v1/sc073hiofw97m/search?lganame=${encodedLGA}&sheet=data`
			)
			.then((response) => {
				setResponseData(response.data);
				setShowMore(true);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};
	return (
		<View style={{ flex: 1, backgroundColor: "#F5F5Ff" }}>
			<View style={styles.container1}>
				<View
					style={{
						flex: 1,
						justifyContent: "space-evenly",
					}}
				>
					<Text
						numberOfLines={1}
						adjustsFontSizeToFit
						style={styles.blockHeading}
					>
						Location
					</Text>
					{(user && (
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							style={styles.nonEmphasised}
						>
							{street}
						</Text>
					)) || (
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							style={styles.nonEmphasised}
						>
							Street
						</Text>
					)}
					{(user && (
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							style={styles.emphsised}
						>
							{lga}
						</Text>
					)) || (
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							style={styles.emphsised}
						>
							LGA
						</Text>
					)}
					{(user && (
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							style={styles.nonEmphasised}
						>
							{state}
						</Text>
					)) || (
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							style={styles.nonEmphasised}
						>
							State
						</Text>
					)}
				</View>

				<Pressable
					style={getIsFormValid() ? styles.buttonE : styles.buttonD}
					onPress={handleClick}
					disabled={!getIsFormValid()}
				>
					<Text
						numberOfLines={1}
						adjustsFontSizeToFit
						style={styles.buttonText}
					>
						{buttonText}
					</Text>
				</Pressable>
			</View>
			<View style={styles.container2}>
				<Text
					numberOfLines={1}
					adjustsFontSizeToFit
					style={styles.blockHeading}
				>
					Emergency Type:
				</Text>
				<Pressable
					style={[
						styles.pills,
						{
							backgroundColor: "#ffe5d9",
						},
					]}
				>
					<FontAwesome name="fire" size={25} color="black" />
					<Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 25 }}>
						Fire:
					</Text>
					{responseData && (
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							onPress={() =>
								Linking.openURL(`tel:${JSON.stringify(responseData[0].fire)}`)
							}
						>
							{responseData[0].fire}
						</Text>
					)}
				</Pressable>
				<Pressable style={[styles.pills, { backgroundColor: "#ccd5ae" }]}>
					<FontAwesome5 name="clinic-medical" size={25} color="black" />
					<Text style={{ fontSize: 25 }}>Medical :</Text>
					{responseData && (
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							onPress={() =>
								Linking.openURL(
									`tel:${JSON.stringify(responseData[0].medical)}`
								)
							}
						>
							{responseData[0].medical}
						</Text>
					)}
				</Pressable>
				<Pressable style={[styles.pills, { backgroundColor: "#bde0fe" }]}>
					<MaterialCommunityIcons name="police-badge" size={25} color="black" />
					<Text style={{ fontSize: 25 }}>Police:</Text>
					{responseData && (
						<Text
							onPress={() =>
								Linking.openURL(`tel:${JSON.stringify(responseData[0].police)}`)
							}
						>
							{responseData[0].police}
						</Text>
					)}
				</Pressable>
				<Pressable
					onPress={() =>
						navigation.push("More Emergencies", {
							data: { responseData },
						})
					}
					disabled={!isShowMoreValid()}
				>
					<Text
						numberOfLines={1}
						adjustsFontSizeToFit
						style={
							isShowMoreValid()
								? {
										fontWeight: "bold",
										color: "blue",
										fontSize: 20,
								  }
								: {
										fontWeight: "bold",
										color: "gray",
										fontSize: 20,
								  }
						}
					>
						Show More +
					</Text>
				</Pressable>
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
		backgroundColor: "white",
		borderRadius: 50,
		margin: 10,
		marginHorizontal: 20,
	},
	blockHeading: {
		fontWeight: "bold",
		fontSize: 35,
		textAlign: "center",
	},
	nonEmphasised: {
		fontSize: 15,
		textAlign: "center",
	},
	emphsised: {
		fontSize: 70,
		textAlign: "center",
		fontWeight: "300",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 92,
		marginHorizontal: 10,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: "#D5BDA9",
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
		justifyContent: "space-evenly",
		paddingHorizontal: 25,
		paddingVertical: 20,
		backgroundColor: "white",
		borderRadius: 50,
		margin: 10,
		marginHorizontal: 20,
	},
	pills: {
		width: "90%",
		height: "15%",
		fontSize: 25,
		borderRadius: 30,
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
});
