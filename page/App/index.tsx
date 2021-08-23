import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Home';
import TestScreen from './Test';

const Stack = createNativeStackNavigator();

function App(): ReactElement {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Test" component={TestScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
