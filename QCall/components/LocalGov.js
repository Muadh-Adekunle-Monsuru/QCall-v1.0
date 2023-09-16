import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Pressable,
	Linking,
} from 'react-native';
import axios from 'axios';
const baseId = 'appHNtEXMOYDoVO7P';
const tableIdOrName = 'tblas9r7MJBlyi48L';
const apiKey =
	'patsREE4xPJYLYJFH.ace1fff28d11239ad3aa74e078802b65775a283c2e942f8d9f78aa499aac10b3'; // Replace with your actual API key

export default function LocalGov(props) {
	const [myArray, setMyArray] = useState(null);
	const mylga = props.route.params.lga.lga;
	useEffect(() => {
		const fetchData = async () => {
			try {
				axios
					.post(
						`https://api.airtable.com/v0/${baseId}/${tableIdOrName}/listRecords`,
						{
							filterByFormula: `{lganame} = "${mylga}"`,
						},
						{
							headers: {
								Authorization: `Bearer ${apiKey}`,
								'Content-Type': 'application/json',
							},
						}
					)
					.then((response) => {
						var theresponse = JSON.parse(response.request.response);
						var finalres = theresponse.records[0].fields;
						setMyArray(Object.entries(finalres).splice(3));
					})
					.catch((error) => {
						console.error('Error fetching data:', error);
					});
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);
	return (
		<View>
			<Text>Local Government</Text>
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
