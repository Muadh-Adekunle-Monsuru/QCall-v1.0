import React, { useState, useEffect } from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Pressable,
	Alert,
	Button,
	Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function NumberSection({ thelga, setTheLGA }) {
	const [responseData, setResponseData] = useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch(
				`https://sheetdb.io/api/v1/sc073hiofw97m/search?lganame=${thelga}&sheet=data`
			);
			const data = await response.json();
			setResponseData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

<<<<<<< HEAD
	return (
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
								Linking.openURL(`tel:${JSON.stringify(responseData[0].police)}`)
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
				<Button title="Fetch Data" onPress={fetchData} />
			</View>
		</View>
	);
=======
export default function NumberSection() {
	return <View style={styles.container}></View>;
>>>>>>> parent of a43dd49 (button to get address disabled if user's coordinates cannot be determined)
}

const styles = StyleSheet.create({
	container2: {
		flex: 0.6,
		alignItems: "center",
		// justifyContent: "center",
		paddingHorizontal: 25,
		paddingVertical: 20,
		backgroundColor: "#F5EBE0",
		borderRadius: 50,
		borderWidth: 2,
		borderColor: "#D5BDAF",
		margin: 10,
		marginHorizontal: 20,
	},
<<<<<<< HEAD
	blockHeading: {
		fontWeight: "bold",
		fontSize: 35,
		textAlign: "center",
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
=======
>>>>>>> parent of a43dd49 (button to get address disabled if user's coordinates cannot be determined)
});
