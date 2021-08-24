import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native-svg';
import Home from './Home';
import StoreList from './StoreList';
import StoreInfo from './StoreInfo';
import Manage from './Manage';

const manager = true; // manager에만 manage tab 생성

const StoreStack = createNativeStackNavigator();

function StoreStackScreen(): ReactElement {
	return (
		<StoreStack.Navigator>
			<StoreStack.Screen name="StoreList" component={StoreList} />
			<StoreStack.Screen name="StoreInfo" component={StoreInfo} />
		</StoreStack.Navigator>
	);
}

const Tab = createBottomTabNavigator();

function App(): ReactElement {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="QR" component={Home} />
				<Tab.Screen name="STORE" component={StoreStackScreen} />
				{manager === true ? <Tab.Screen name="MANAGE" component={Manage} /> : null}
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default App;
