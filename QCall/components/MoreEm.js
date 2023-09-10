import React, { useState, useEffect } from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Button,
	Pressable,
	Linking,
} from "react-native";
import LocationSection from "./LocationSection";

export default function MoreEm(props) {
	const objectValuesArray = Object.entries(
		props.route.params.data.responseData[0]
	).slice(6);
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<View>
				{objectValuesArray.map(([key, value], index) => (
					<View key={index}>
						<Pressable
							style={styles.pills}
							onPress={() => Linking.openURL(`tel:${value}`)}
						>
							<Text key={index}>
								{key}: {value}
							</Text>
						</Pressable>
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	pills: {
		fontSize: 25,
		borderRadius: 30,
		paddingHorizontal: 75,
		paddingVertical: 20,
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "#ffc8dd",
	},
});
