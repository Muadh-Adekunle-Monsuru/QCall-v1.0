import {
	Text,
	View,
	StyleSheet,
	Image,
	Pressable,
	Linking,
	Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
export default function CallRow(props) {
	const createTwoButtonAlert = (props) => {
		Alert.alert(
			`Phone number: 0${props}`,
			'You can report the number if it is not functional',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{ text: 'Report Number', onPress: () => handleAddEntry(`0${props}`) },
			]
		);
	};
	const handleAddEntry = (props) => {
		const API_KEY =
			'patvmCxNndpDP9Kcy.94a6eb441d9c345b0a234c040b1ea1962b6ca4e13768acba0af780b5a3a61395';
		const BASE_ID = 'app6Hr5myxKLdPMh1';
		const TABLE_NAME = 'tblD1HGu3pJHpGn5N';

		const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

		const data = {
			records: [
				{
					fields: {
						Number: props,
						// Add more fields and values as needed
					},
				},
			],
		};

		const headers = {
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json',
		};

		axios
			.post(url, data, { headers })
			.then((response) => {
				Alert.alert('The number has been successfully reported');
			})
			.catch((error) => {
				Alert.alert('Error reporting number:', error);
			});
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: '100%',
			}}
			key={props.index}
		>
			<View style={[styles.pills, { width: '50%' }]}>
				<Text style={{ fontSize: scale(15) }}>{props.name}</Text>
			</View>
			<Pressable
				style={styles.callButton}
				onPress={() => Linking.openURL(`tel:0${JSON.stringify(props.number)}`)}
				onLongPress={() => createTwoButtonAlert(props.number)}
			>
				<Text style={{ textAlign: 'center' }}>
					<Entypo name='phone' size={scale(24)} color='#023047' />
				</Text>
			</Pressable>
			<Pressable
				style={styles.smsButton}
				onPress={() => Linking.openURL(`sms:0${JSON.stringify(props.number)}`)}
			>
				<Text style={{ textAlign: 'center' }}>
					<MaterialIcons name='sms' size={scale(24)} color='#344e41' />
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	pills: {
		paddingVertical: '7%',
		marginVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: 'white',
		width: '70%',
	},
	callButton: {
		backgroundColor: '#00b4d8',
		paddingVertical: '5%',
		borderRadius: 10,
		width: '20%',
		justifyContent: 'center',
		alignContent: 'center',
		elevation: 5,
	},
	smsButton: {
		backgroundColor: '#dde5b6',
		paddingVertical: '5%',
		borderRadius: 10,
		width: '20%',
		justifyContent: 'center',
		alignContent: 'center',
		elevation: 5,
	},
});
