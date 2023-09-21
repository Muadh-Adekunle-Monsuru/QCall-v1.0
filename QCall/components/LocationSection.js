import React, { useState, useEffect } from 'react';
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Pressable,
	Alert,
	Linking,
	AlertComponent,
	Button,
} from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import axios from 'axios';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CallRow from './CallRow';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import MapAnimation from './Animation';
import { useWindowDimensions } from 'react-native';

var latitude = ' ';
var longitude = '';
var myResponse;
export default function LocationSection({ navigation }) {
	const [location, setLocation] = useState(null);
	const [buttonActivation, setButtonActivation] = useState(false);
	const [responseData, setResponseData] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [user, setUser] = useState(null); // Change initial state to null
	const [street, setStreet] = useState(''); // Initialize street state
	const [lga, setLga] = useState(null); // Initialize street state
	const [state, setState] = useState(''); // Initialize street state
	const [buttonText, setButtonText] = useState('Waiting For Coordinates');
	const [showMore, setShowMore] = useState(false);
	const [loadDots, setLoadDots] = useState(null);
	const { fontScale } = useWindowDimensions(); // import useWindowDimensions()
	const baseId = 'appHNtEXMOYDoVO7P';
	const tableIdOrName = 'tbl3WmhzqEvq2TSDl';
	const apiKey =
		'patsREE4xPJYLYJFH.ace1fff28d11239ad3aa74e078802b65775a283c2e942f8d9f78aa499aac10b3'; // Replace with your actual API key

	const getIsFormValid = () => {
		return buttonActivation;
	};
	const isShowMoreValid = () => {
		return showMore;
	};

	useEffect(() => {
		const getLocation = async () => {
			setErrorMsg(null);
			let locationEnabled = await Location.hasServicesEnabledAsync();
			if (locationEnabled) {
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					setErrorMsg('Permission to access location was denied');
					return;
				} else {
					let location = await Location.getCurrentPositionAsync({
						accuracy: Location.Accuracy.Balanced,
						timeInterval: 5000,
						accuracy: 1000,
					});
					setLocation(location);
					setButtonActivation(true);
					setButtonText('Get Address');
				}
			} else {
				setErrorMsg(
					'DEVICE LOCATION IS NOT ENABLED, Restart the application with location enabled'
				);
			}
		};
		getLocation();
	}, []);

	let text = 'Waiting...';
	if (errorMsg) {
		Alert.alert(errorMsg);
	} else if (location) {
		latitude = location.coords.latitude;
		longitude = location.coords.longitude;

		text = JSON.stringify(location);
	}
	const handleClick = async () => {
		try {
			setErrorMsg(null);
			const response = await fetch(
				`https://api.opencagedata.com/geocode/v1/json?q=${latitude},+${longitude}&key=f7e47292a87f479bb355f49e907cce10&language=en&pretty=1&no_annotations=1`
			);
			const data = await response.json();
			var tinyLGA = '';
			if (response.ok) {
				setUser(JSON.stringify(data));
				setStreet(data.results[0].formatted);
				if (data.results[0].components.county == undefined) {
					setLga(data.results[0].components.city);
					tinyLGA = data.results[0].components.city;
				} else {
					setLga(data.results[0].components.county);
					tinyLGA = data.results[0].components.county;
				}

				setState(data.results[0].components.state);
				{
					fetchData(tinyLGA);
				}
			} else {
				setErrorMsg(
					`Error getting address :${data.status.message} \n Bad coordinates `
				);
			}
		} catch (error) {
			setErrorMsg(`${error.message}.\n Check device internet connection. `);
		}
	};
	const fetchData = async (prop) => {
		setLoadDots(true);
		try {
			setErrorMsg(null);
			axios
				.post(
					`https://api.airtable.com/v0/${baseId}/${tableIdOrName}/listRecords`,
					{
						view: 'grid',
						filterByFormula: `{lganame} = "${prop}"`,
					},
					{
						headers: {
							Authorization: `Bearer ${apiKey}`,
							'Content-Type': 'application/json',
						},
					}
				)
				.then((response) => {
					setLoadDots(false);
					var theresponse = JSON.parse(response.request.response);
					var finalres = theresponse.records[0].fields;
					setResponseData(finalres);
					setShowMore(true);
				})
				.catch((error) => {
					setErrorMsg('Error fetching contact from database:', error);
				});
		} catch (error) {
			setErrorMsg('Error fetching contact from database:', error);
		}
	};
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5Ff' }}>
				<View style={styles.container1}>
					<View
						style={{
							flex: 1,
							justifyContent: 'space-evenly',
						}}
					>
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							style={styles.blockHeading}
						>
							Location
						</Text>
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
						<View style={{ height: '60%', justifyContent: 'space-evenly' }}>
							{(user && (
								<>
									<Text
										numberOfLines={1}
										adjustsFontSizeToFit
										style={styles.nonEmphasised}
									>
										{street}
									</Text>
									<Text
										numberOfLines={1}
										adjustsFontSizeToFit
										style={styles.emphsised}
									>
										{lga}
									</Text>
									<Text
										numberOfLines={1}
										adjustsFontSizeToFit
										style={styles.nonEmphasised}
									>
										{state}
									</Text>
								</>
							)) || (
								<LottieView
									source={require('../assets/mapanimation.json')}
									autoPlay
									loop
									style={{
										width: '100%',
										height: '100%',
										alignSelf: 'center',
									}}
								/>
							)}
						</View>
					</View>

					<Pressable
						style={getIsFormValid() ? styles.buttonE : styles.buttonD}
						onPress={handleClick}
						disabled={!getIsFormValid()}
					>
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							style={styles.buttonText}
						>
							{buttonText}
						</Text>
					</Pressable>
				</View>
				<View style={styles.container2}>
					<Text
						numberOfLines={1}
						adjustsFontSizeToFit
						style={styles.blockHeading}
					>
						Emergency Type:
					</Text>
					<View>
						{(responseData && (
							<CallRow
								name='Fire'
								number={JSON.stringify(responseData.fire)}
								index={1}
							/>
						)) || (
							<Text style={styles.pills}>
								Fire
								{loadDots && <Text> .....</Text>}
							</Text>
						)}
					</View>
					<View>
						{(responseData && (
							<CallRow
								name='Medical'
								number={JSON.stringify(responseData.medical)}
								index={2}
							/>
						)) || (
							<Text style={styles.pills}>
								Medical
								{loadDots && <Text> .....</Text>}
							</Text>
						)}
					</View>
					<View>
						{(responseData && (
							<CallRow
								name='Police'
								number={JSON.stringify(responseData.police)}
								index={3}
							/>
						)) || (
							<Text style={styles.pills}>
								Police {loadDots && <Text> .....</Text>}
							</Text>
						)}
					</View>

					<Pressable
						onPress={() =>
							navigation.push('More Emergencies', {
								data: { responseData },
							})
						}
						disabled={!isShowMoreValid()}
					>
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							style={
								isShowMoreValid()
									? {
											fontWeight: 'bold',
											color: '#284b63',
											fontSize: 20 / fontScale,
											alignSelf: 'center',
									  }
									: {
											fontWeight: 'bold',
											color: '#dee2e6',
											fontSize: 20 / fontScale,
											alignSelf: 'center',
									  }
							}
						>
							More Emergencies +
						</Text>
					</Pressable>
				</View>
				<Pressable
					style={isShowMoreValid() ? styles.buttonE : styles.buttonD}
					onPress={() =>
						navigation.navigate('Other Contacts', {
							lga: { lga },
							state: { state },
						})
					}
					disabled={!isShowMoreValid()}
				>
					<Text
						numberOfLines={1}
						adjustsFontSizeToFit
						style={styles.buttonText}
					>
						Other Contacts
					</Text>
				</Pressable>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container1: {
		flex: 0.45,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 25,
		paddingVertical: 20,
		backgroundColor: 'white',
		borderRadius: 50,
		margin: 10,
		marginHorizontal: 20,
	},
	blockHeading: {
		fontWeight: 'bold',
		fontSize: 35,
		textAlign: 'center',
	},
	nonEmphasised: {
		fontSize: 15,
		textAlign: 'center',
	},
	emphsised: {
		fontSize: 70,
		textAlign: 'center',
		fontWeight: '300',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 92,
		marginHorizontal: 10,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: '#D5BDA9',
	},
	callButton: {
		backgroundColor: '#00b4d8',
		paddingVertical: '7%',
		borderRadius: 10,
		width: '35%',
		justifyContent: 'center',
		alignContent: 'center',
	},

	buttonE: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: '#D5BDA9',
		width: '50%',
		alignSelf: 'center',
	},
	buttonD: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: '#dee2e6',
		width: '50%',
		alignSelf: 'center',
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},
	text: {
		marginTop: 20,
		fontSize: 18,
		textAlign: 'center',
	},
	container2: {
		flex: 0.5,
		justifyContent: 'space-evenly',
		paddingHorizontal: 25,
		paddingVertical: 20,
		backgroundColor: 'white',
		borderRadius: 50,
		margin: 10,
		marginHorizontal: 20,
	},
	pills: {
		paddingVertical: '7%',
		borderRadius: 10,
		marginVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#f8f9fa',
		width: '100%',
		textAlign: 'center',
	},
});
