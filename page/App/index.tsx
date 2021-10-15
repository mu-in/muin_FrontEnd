import React, { ReactElement, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Home';
import Login from './Login';
import AuthManager from './AuthManager';

import StoreList from './Store';
import StoreInfo from './Store/StoreInfo';

import Manage from './Manage';
import ManageHome from './Manage/ManageHome';
import ManageStock from './Manage/ManageStock';
import TransactionHistory from './Manage/TransactionHistory';

import { UserContextProvider, UserContext } from './Context';

Ionicons.loadFont().then();

const HomeStack = createNativeStackNavigator();
function HomeStackScreen(): ReactElement {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="QR" component={Home} />
			<HomeStack.Screen name="Login" component={Login} />
			<HomeStack.Screen name="매니저 인증" component={AuthManager} />
		</HomeStack.Navigator>
	);
}

const StoreStack = createNativeStackNavigator();
function StoreStackScreen(): ReactElement {
	return (
		<StoreStack.Navigator>
			<StoreStack.Screen name="STORE" component={StoreList} />
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
function TabScreen(): ReactElement {
	const { name, manager } = useContext(UserContext);

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ size, color }: { size: number; color: string }) => {
						let icon = 'ios-information-circle';

						if (route.name === '홈') {
							icon = 'ios-scan-sharp';
						} else if (route.name === '매장') {
							icon = 'basket-outline';
						} else if (route.name === '관리') {
							icon = 'md-cog';
						}
						return <Ionicons name={icon} size={size} color={color} />;
					},
					headerShown: false,
				})}
			>
				<Tab.Screen name="홈" component={HomeStackScreen} />
				{name !== '-' ? <Tab.Screen name="매장" component={StoreStackScreen} /> : null}
				{manager === true ? <Tab.Screen name="관리" component={ManageStackScreen} /> : null}
			</Tab.Navigator>
		</NavigationContainer>
	);
}

function App(): ReactElement {
	return (
		<UserContextProvider>
			<TabScreen />
		</UserContextProvider>
	);
}

export default App;
