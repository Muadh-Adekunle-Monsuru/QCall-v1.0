import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Pressable,
	Linking,
	ScrollView,
} from 'react-native';
import axios from 'axios';
import CallRow from './CallRow';
import LottieView from 'lottie-react-native';
const baseId = 'appHNtEXMOYDoVO7P';
const tableIdOrName = 'tblas9r7MJBlyi48L';
const apiKey =
	'patsREE4xPJYLYJFH.ace1fff28d11239ad3aa74e078802b65775a283c2e942f8d9f78aa499aac10b3'; // Replace with your actual API key

export default function LocalGov(props) {
	const [myArray, setMyArray] = useState(null);
	const mylga = props.route.params.lga.lga;
	const [errorMsg, setErrorMsg] = useState(null);
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
						setErrorMsg('Error fetching data check your internet connection');
					});
			} catch (error) {
				setErrorMsg('Error fetching data check your internet connection');
			}
		};
		fetchData();
	}, []);
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			{/* <Text style={styles.headerText}>{mylga} Local Government Contacts</Text> */}
			<ScrollView
				style={styles.container}
				alwaysBounceVertical={true}
				bounces={true}
			>
				{errorMsg && (
					<Text
						style={{
							color: 'red',
							alignSelf: 'center',
							textAlign: 'center',
						}}
					>
						{errorMsg}
					</Text>
				)}
				{(myArray &&
					myArray.map(([key, value], index) => (
						<View key={index}>
							<CallRow name={key} number={value} index={index} />
						</View>
					))) || (
					<LottieView
						source={require('../assets/loading.json')}
						autoPlay
						loop
						style={{
							width: '100%',
							height: '100%',
							alignSelf: 'center',
						}}
					/>
				)}
			</ScrollView>
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
	container: {
		flex: 0.9,
		backgroundColor: 'white',
		marginHorizontal: 10,
	},
	headerText: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
