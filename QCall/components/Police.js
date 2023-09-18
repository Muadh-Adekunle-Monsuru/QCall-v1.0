import React, { useState, useEffect } from 'react';
import {
	Button,
	Pressable,
	View,
	Text,
	Alert,
	StyleSheet,
	Linking,
	ScrollView,
} from 'react-native';
import axios from 'axios';
import CallRow from './CallRow';
const baseId = 'appHNtEXMOYDoVO7P';
const tableIdOrName = 'tbltNU9EDPUO1ExpK';
const apiKey =
	'patsREE4xPJYLYJFH.ace1fff28d11239ad3aa74e078802b65775a283c2e942f8d9f78aa499aac10b3'; // Replace with your actual API key

export default function Police(props) {
	const [ResponseData, setResponseData] = useState(null);
	const [myArray, setMyArray] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api.airtable.com/v0/${baseId}/${tableIdOrName}`,
					{
						headers: {
							Authorization: `Bearer ${apiKey}`,
							'Content-Type': 'application/json',
						},
					}
				);
				const responseData = response.data.records[0].fields;
				setMyArray(Object.entries(responseData));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData(); // Invoke the fetchData function
	}, []); // Empty dependency array means this effect runs once on component mount

	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<Text>Police rank </Text>
			<ScrollView
				style={styles.container}
				alwaysBounceVertical={true}
				bounces={true}
			>
				{myArray &&
					myArray.map(([key, value], index) => (
						<View key={index}>
							<CallRow name={key} number={value} index={index} />
						</View>
					))}
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 0.9,
		backgroundColor: 'white',
		marginHorizontal: 10,
	},
});
