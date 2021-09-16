import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Home';
import AuthManager from './AuthManager';

import StoreList from './Store';
import StoreInfo from './Store/StoreInfo';

import Manage from './Manage';
import ManageHome from './Manage/ManageHome';
import ManageStock from './Manage/ManageStock';
import TransactionHistory from './Manage/TransactionHistory';

Ionicons.loadFont().then();

const manager = true; // manager에만 manage tab 생성

const HomeStack = createNativeStackNavigator();
function HomeStackScreen(): ReactElement {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="QR" component={Home} initialParams={{ manager: false }} />
			<HomeStack.Screen name="매니저 인증" component={AuthManager} />
		</HomeStack.Navigator>
	);
}

const StoreStack = createNativeStackNavigator();
function StoreStackScreen(): ReactElement {
	return (
		<StoreStack.Navigator>
			<StoreStack.Screen name="StoreList" component={StoreList} />
			<StoreStack.Screen name="StoreInfo" component={StoreInfo} />
		</StoreStack.Navigator>
	);
}

const ManageStack = createNativeStackNavigator();
function ManageStackScreen(): ReactElement {
	return (
		<ManageStack.Navigator>
			<ManageStack.Screen name="관리 매장" component={Manage} />
			<ManageStack.Screen name="세종마트" component={ManageHome} />
			<ManageStack.Screen name="재고관리" component={ManageStock} />
			<ManageStack.Screen name="최근거래" component={TransactionHistory} />
		</ManageStack.Navigator>
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

						if (route.name === 'HOME') {
							icon = 'ios-scan-sharp';
						} else if (route.name === 'STORE') {
							icon = 'basket-outline';
						} else if (route.name === 'MANAGE') {
							icon = 'md-cog';
						}
						return <Ionicons name={icon} size={size} color={color} />;
					},
					headerShown: false,
				})}
			>
				<Tab.Screen name="HOME" component={HomeStackScreen} />
				<Tab.Screen name="STORE" component={StoreStackScreen} />
				{manager === true ? <Tab.Screen name="MANAGE" component={ManageStackScreen} /> : null}
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default App;
