import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import LocationSection from "../components/LocationSection";

export default function Others() {
	return (
		<View style={styles.container}>
			<Text>More Contacts</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
