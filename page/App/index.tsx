import React, { ReactElement, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';

import Home from './Home';
import Login from './Login';
import AuthManager from './AuthManager';

import Store from './Store';
import Manage from './Manage';

import Test from './Test';

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

function StoreStackScreen(): ReactElement {
	return <Store />;
}

const ManageStack = createNativeStackNavigator();
function ManageStackScreen(): ReactElement {
	return (
		<ManageStack.Navigator>
			<ManageStack.Screen name="관리" component={Manage} />
		</ManageStack.Navigator>
	);
}

function TestStackScreen(): ReactElement {
	return <Test />;
}

// import ManageHome from './Manage/ManageHome';
// import ManageStock from './Manage/ManageStock';
// import TransactionHistory from './Manage/TransactionHistory';
// <ManageStack.Screen name="세종마트" component={ManageHome} />
// <ManageStack.Screen name="재고관리" component={ManageStock} />
// <ManageStack.Screen name="최근거래" component={TransactionHistory} />

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
				{/* <Tab.Screen name="테스트" component={TestStackScreen} /> */}
				{name !== '-' ? <Tab.Screen name="매장" component={StoreStackScreen} /> : null}
				{manager === true ? <Tab.Screen name="관리" component={ManageStackScreen} /> : null}
			</Tab.Navigator>
		</NavigationContainer>
	);
}

function App(): ReactElement {
	LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
	LogBox.ignoreAllLogs(); // Ignore all log notifications

	return (
		<UserContextProvider>
			<TabScreen />
		</UserContextProvider>
	);
}

export default App;
