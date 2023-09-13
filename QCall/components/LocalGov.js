import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

export default function LocalGov(props) {
	const mylga = props.route.params.lga.lga;

	let encodedLGA = encodeURIComponent(`${mylga}`);
	console.log(encodedLGA);
	const fetchData = async () => {
		try {
			console.log(encodedLGA);
			const response = await fetch(
				`https://sheetdb.io/api/v1/sc073hiofw97m/search?lganame=${encodedLGA}&sheet=lga`
			);
			const values = await response.json();
			setResponseData(values[0]);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	return (
		<View>
			<Text>Local Government</Text>
		</View>
	);
}
