import {
	Text,
	View,
	StyleSheet,
	Image,
	Pressable,
	Linking,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function CallRow(props) {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
			key={props.index}
		>
			<View style={[styles.pills, { width: '60%' }]}>
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
		</View>
	);
}

const styles = StyleSheet.create({
	pills: {
		paddingVertical: '7%',
		borderRadius: 10,
		marginVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#f8f9fa',
	},
	callButton: {
		backgroundColor: '#00b4d8',
		paddingVertical: '7%',
		borderRadius: 10,
		width: '35%',
		justifyContent: 'center',
		alignContent: 'center',
	},
});
