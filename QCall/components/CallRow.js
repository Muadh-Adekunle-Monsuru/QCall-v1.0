import {
	Text,
	View,
	StyleSheet,
	Image,
	Pressable,
	Linking,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
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
				onPress={() => Linking.openURL(`tel:${JSON.stringify(props.number)}`)}
			>
				<Text style={{ textAlign: 'center' }}>
					<AntDesign name='phone' size={24} color='black' />
				</Text>
			</Pressable>
			<Pressable
				style={styles.smsButton}
				onPress={() => Linking.openURL(`sms:${JSON.stringify(props.number)}`)}
			>
				<Text style={{ textAlign: 'center' }}>
					<MaterialIcons name='sms' size={24} color='black' />
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
		backgroundColor: '#fefae0',
		width: '70%',
	},
	callButton: {
		backgroundColor: '#00b4d8',
		paddingVertical: '5%',
		borderRadius: 10,
		width: '15%',
		justifyContent: 'center',
		alignContent: 'center',
	},
	smsButton: {
		backgroundColor: '#dde5b6',
		paddingVertical: '5%',
		borderRadius: 10,
		width: '15%',
		justifyContent: 'center',
		alignContent: 'center',
	},
});
