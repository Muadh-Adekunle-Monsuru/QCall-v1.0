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
export default function CallRow(props) {
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
				<Text style={{ fontSize: 20 }}>{props.name}</Text>
			</View>
			<Pressable
				style={styles.callButton}
				onPress={() => Linking.openURL(`tel:0${JSON.stringify(props.number)}`)}
				onLongPress={() => Alert.alert(`Phone Number: 0${props.number}`)}
			>
				<Text style={{ textAlign: 'center' }}>
					<Entypo name='phone' size={24} color='#023047' />
				</Text>
			</Pressable>
			<Pressable
				style={styles.smsButton}
				onPress={() => Linking.openURL(`sms:0${JSON.stringify(props.number)}`)}
			>
				<Text style={{ textAlign: 'center' }}>
					<MaterialIcons name='sms' size={24} color='#344e41' />
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
