import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, usenai } from "react-native";
import LocationSection from "./LocationSection";

export default function MoreEm(props) {
	return (
		<View style={styles.container}>
			<Text>More Emergencies {props.route.params.lga}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
