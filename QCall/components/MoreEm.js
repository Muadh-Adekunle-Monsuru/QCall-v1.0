import React, { useState, useEffect } from 'react';
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Button,
	Pressable,
	Linking,
	ScrollView,
} from 'react-native';
import CallRow from './CallRow';
export default function MoreEm(props) {
	const objectValuesArray = Object.entries(
		props.route.params.data.responseData
	).splice(6);
	return (
		<ScrollView
			style={styles.container}
			alwaysBounceVertical={true}
			bounces={true}
		>
			{objectValuesArray.map(([key, value], index) => (
				<CallRow name={key} number={value} index={index} />
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		marginHorizontal: 10,
	},
	pills: {
		fontSize: 35,
		borderRadius: 30,
		paddingHorizontal: 75,
		paddingVertical: 30,
		marginVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#ffc8dd',
	},
});
