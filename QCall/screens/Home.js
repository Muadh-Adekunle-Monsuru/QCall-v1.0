import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import LocationSection from "../components/LocationSection";
import NumberSection from "../components/NumberSection";
export default function Home() {
	const [thelga, setTheLGA] = useState("Initial LGA");
	return (
		<View style={styles.container}>
			<LocationSection thelga={thelga} setTheLGA={setTheLGA} />
			<NumberSection thelga={thelga} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EDEDE9",
	},
});
