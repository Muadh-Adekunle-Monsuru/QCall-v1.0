import React, { useState, useEffect } from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Pressable,
	Alert,
} from "react-native";

export default function NumberSection() {
	return (
		<View style={styles.container}>
			<Text style={styles.blockHeading}>Contacts</Text>
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
