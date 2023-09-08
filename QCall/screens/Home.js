import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import LocationSection from "../components/LocationSection";

export default function Home() {
	return (
		<View style={styles.container}>
			<LocationSection />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EDEDE9",
	},
});
