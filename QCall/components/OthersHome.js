import React, { useState, useEffect } from 'react';
import {
	Platform,
	Pressable,
	Text,
	View,
	StyleSheet,
	Alert,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { AntDesign } from '@expo/vector-icons';
export default function OthersHompage(props) {
	const lga = props.route.params.lga.lga;
	const state = props.route.params.state.state;
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Pressable
					style={styles.button}
					onPress={() => props.navigation.navigate('Police', { lga: { lga } })}
				>
					<View>
						<Text style={{ textAlign: 'center', fontSize: scale(20) }}>
							Police Contacts
						</Text>
					</View>
				</Pressable>
				<Pressable
					onPress={() => props.navigation.navigate('Army', { lga: { lga } })}
					style={styles.button}
				>
					<View>
						<Text style={{ textAlign: 'center', fontSize: scale(20) }}>
							{' '}
							Army Contacts
						</Text>
					</View>
				</Pressable>
			</View>
			<View style={styles.row}>
				<Pressable
					onPress={() =>
						props.navigation.navigate('Local Government', { lga: { lga } })
					}
					style={styles.button}
				>
					<View>
						<Text style={{ textAlign: 'center', fontSize: scale(20) }}>
							{' '}
							{lga} LGA Contacts
						</Text>
					</View>
				</Pressable>
				<Pressable
					onPress={() =>
						props.navigation.navigate('State Government', {
							state: { state },
							lga: { lga },
						})
					}
					style={styles.button}
				>
					<View>
						<Text style={{ textAlign: 'center', fontSize: scale(20) }}>
							{' '}
							{state} Contacts
						</Text>
					</View>
				</Pressable>
			</View>
			<View>
				<Text style={{ textAlign: 'center' }}>
					<AntDesign name='infocirlceo' size={scale(10)} color='black' /> Tip:
					Long-press on the phone button to report a number.{' '}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'space-evenly',
	},
	row: {
		flex: 0.25,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	button: {
		width: '40%',
		borderRadius: 20,
		justifyContent: 'center',
		backgroundColor: '#f5ebe0',
		alignContent: 'center',
		elevation: 3,
	},
});
