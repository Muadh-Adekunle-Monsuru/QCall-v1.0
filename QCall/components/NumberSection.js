import React, { useState, useEffect } from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Pressable,
	Alert,
	Button,
} from "react-native";

export default function NumberSection() {
	const [responseData, setResponseData] = useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch(
				"https://sheetdb.io/api/v1/sc073hiofw97m/search?lganame=oron&sheet=data"
			);
			const data = await response.json();
			setResponseData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.blockHeading}>Contacts</Text>

			<Button title="Fetch Data" onPress={fetchData} />
			{responseData && (
				<View>
					<Text>API Response:</Text>
					<Text>{JSON.stringify(responseData, null, 2)}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0.6,
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
});
