import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import StoreList from './StoreList';
import StoreInfo from './StoreInfo';
import Manage from './Manage';

Ionicons.loadFont().then();

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
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ size, color }: { size: number; color: string }) => {
						let icon = 'ios-information-circle';

						if (route.name === 'QR') {
							icon = 'ios-scan-sharp';
						} else if (route.name === 'STORE') {
							icon = 'basket-outline';
						} else if (route.name === 'MANAGE') {
							icon = 'md-cog';
						}
						return <Ionicons name={icon} size={size} color={color} />;
					},
				})}
			>
				<Tab.Screen name="QR" component={Home} />
				<Tab.Screen name="STORE" component={StoreStackScreen} />
				{manager === true ? <Tab.Screen name="MANAGE" component={Manage} /> : null}
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default App;
