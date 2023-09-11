import React, { useState, useEffect } from "react";
import {
	Platform,
	Pressable,
	Text,
	View,
	StyleSheet,
	Alert,
} from "react-native";
import PageButton from "./PageButton";
import Police from "./Police";
export default function OthersHompage({ navigation }) {
	return (
		<View style={styles.container}>
			<Pressable
				style={{ alignContent: "center" }}
				onPress={() => navigation.navigate("Police")}
			>
				<PageButton text="Police Personnels" backgroundColor="#FFD6FF" />
			</Pressable>
			<Pressable onPress={() => navigation.navigate("Army")}>
				<PageButton text="Army Personnels" backgroundColor="#E7C6FF" />
			</Pressable>
			<Pressable onPress={() => navigation.navigate("Local Government")}>
				<PageButton
					text="Local Government Personnels"
					backgroundColor="#C8B6FF"
				/>
			</Pressable>
			<Pressable onPress={() => navigation.navigate("State Government")}>
				<PageButton
					text="State Government Personnels"
					backgroundColor="#B8C0FF"
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "space-evenly",
	},
});
