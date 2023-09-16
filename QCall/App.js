import 'react-native-gesture-handler';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LocationSection from './components/LocationSection';
import MoreEm from './components/MoreEm';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import OthersHompage from './components/OthersHome';
import Army from './components/Army';
import Police from './components/Police';
import LocalGov from './components/LocalGov';
import StateGov from './components/StateGov';

const Stack = createStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: 'white' },
				}}
			>
				<Stack.Screen
					name='Home'
					component={LocationSection}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen name='More Emergencies' component={MoreEm} />
				<Stack.Screen name='Other Contacts' component={OthersHompage} />
				<Stack.Screen name='Army' component={Army} />
				<Stack.Screen name='Police' component={Police} />
				<Stack.Screen name='Local Government' component={LocalGov} />
				<Stack.Screen name='State Government' component={StateGov} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});
