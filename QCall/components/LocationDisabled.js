import React, { useState, useEffect } from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Pressable,
	Alert,
	Linking,
	AlertComponent,
} from "react-native";

export default function LocationDisabled() {
	return (
		<View style={{ flex: 1 }}>
			<Text>You need to Enable Location</Text>
			<Text>Close the app and enable location</Text>
		</View>
	);
}
