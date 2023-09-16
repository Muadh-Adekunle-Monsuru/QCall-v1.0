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
const baseId = 'appHNtEXMOYDoVO7P';
const tableIdOrName = 'tbltNU9EDPUO1ExpK';
const apiKey =
	'patsREE4xPJYLYJFH.ace1fff28d11239ad3aa74e078802b65775a283c2e942f8d9f78aa499aac10b3'; // Replace with your actual API key

export default function Police(props) {
	const [ResponseData, setResponseData] = useState(null);
	useEffect(() => {
		console.log('calling api');
		async () => {
			axios
				.get(
					`https://api.airtable.com/v0/${baseId}/${tableIdOrName}`,

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
					// setResponseData(finalres);
					console.log(response);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		};
	}, []);

	return (
		<View>
			<Text>Police rank </Text>
			{ResponseData && <Text>{ResponseData}</Text>}
		</View>
	);
}
