import React, { useState, useEffect } from "react";
import {
	Button,
	Pressable,
	View,
	Text,
	Alert,
	StyleSheet,
	Linking,
} from "react-native";

export default function Police(props) {
	const [ResponseData, setResponseData] = useState(null);
	const fetchData = async () => {
		try {
			const response = await fetch(
				`https://sheetdb.io/api/v1/sc073hiofw97m/search?sheet=lga`
			)
				.then((response) => response.json())
				.then((data) => setResponseData(data))
				.then((data) => console.log(ResponseData));
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	{
		fetchData();
	}
	return (
		<View>
			<Text>Police rank </Text>
			{ResponseData && <Text>{ResponseData}</Text>}
		</View>
	);
}
