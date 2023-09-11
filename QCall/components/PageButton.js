import React, { useState, useEffect } from "react";
import {
	Platform,
	Alert,
	Text,
	View,
	StyleSheet,
	Pressable,
} from "react-native";

export default function PageButton(props) {
	return (
		<Text
			style={[
				styles.button,
				{ backgroundColor: `${props.backgroundColor}`, alignSelf: "center" },
			]}
		>
			{props.text}
		</Text>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: "30%",
		paddingVertical: 40,
		borderRadius: 40,
		marginHorizontal: 20,
		marginVertical: 5,
		justifyContent: "center",
		alignContent: "center",
	},
});
