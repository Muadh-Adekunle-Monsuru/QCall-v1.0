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

	return (
		<View style={styles.container}>
			<Text style={styles.blockHeading}>Contacts</Text>
			{responseData && (
				<View>
					<Text style={{ fontSize: 30 }}>
						Fire: {JSON.stringify(responseData[0].fire)}
					</Text>
					<Text style={{ fontSize: 30 }}>
						Medical : {JSON.stringify(responseData[0].medical)}
					</Text>
					<Text style={{ fontSize: 30 }}>
						Police: {JSON.stringify(responseData[0].police)}
					</Text>
				</View>
			)}
			<Button title="Fetch Data" onPress={fetchData} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
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
	blockHeading: {
		fontWeight: "bold",
		fontSize: 35,
		textAlign: "center",
	},
});
