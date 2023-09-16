import React, { useState, useEffect } from 'react';
import {
	Button,
	Pressable,
	View,
	Text,
	Alert,
	StyleSheet,
	Linking,
} from 'react-native';
import axios from 'axios';
const baseId = 'appHNtEXMOYDoVO7P';
const tableIdOrName = 'tblNmHb6fHe23sBeR';
const apiKey =
	'patsREE4xPJYLYJFH.ace1fff28d11239ad3aa74e078802b65775a283c2e942f8d9f78aa499aac10b3'; // Replace with your actual API key

export default function Army(props) {
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
		<View>
			<Text>Army rank </Text>
			<View>
				{myArray &&
					myArray.map(([key, value], index) => (
						<View key={index}>
							<Pressable
								style={styles.pills}
								onPress={() => Linking.openURL(`tel:${value}`)}
							>
								<Text>
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
	pills: {
		fontSize: 25,
		borderRadius: 30,
		paddingHorizontal: 75,
		paddingVertical: 20,
		marginVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#ffc8dd',
	},
});
