import React, { useState, useEffect } from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Button,
	Pressable,
	Linking,
	ScrollView,
} from "react-native";
import LocationSection from "./LocationSection";

export default function MoreEm(props) {
	const objectValuesArray = Object.entries(
		props.route.params.data.responseData[0]
	).slice(6);
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}
		>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "space-evenly",
				}}
			>
				{objectValuesArray.map(([key, value], index) => (
					<View key={index}>
						<Pressable
							style={styles.pills}
							onPress={() => Linking.openURL(`tel:${value}`)}
						>
							<Text
								numberOfLines={1}
								adjustsFontSizeToFit
								key={index}
								style={{ fontSize: 20 }}
							>
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
		fontSize: 35,
		borderRadius: 30,
		paddingHorizontal: 75,
		paddingVertical: 30,
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "#ffc8dd",
	},
});
