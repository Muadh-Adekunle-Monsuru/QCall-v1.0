import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import LocationSection from "./LocationSection";

export default function MoreEm() {
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
