import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';

import LottieView from 'lottie-react-native';

export function MapAnimation() {
	return (
		<LottieView source={require('../assets/mapanimation.json')} autoPlay loop />
	);
}
