import React, { ReactElement } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

interface navigatorProps {
	route: {
		key: string;
		name: string;
		params: {
			storeName: string;
		};
		path: string;
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	box: {
		backgroundColor: '#F2F2F2',
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	btn: {
		height: 80,
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
		marginBottom: 0,
	},
	btn_top: {
		margin: 15,
		marginLeft: 20,
		fontWeight: 'bold',
		fontSize: 15,
	},
	btn_bottom: {
		marginLeft: 20,
		color: '#5E5E5E',
	},
	btn_right: {
		position: 'absolute',
		right: 30,
		top: 25,
		color: '#298FFF',
		fontWeight: 'bold',
		fontSize: 20,
	},
});

interface Props2 {
	navigation: NativeStackNavigationProp<ParamListBase, '홈'>;
}

const Manage2Stack = createNativeStackNavigator();
function Manage(storeName: navigatorProps): ReactElement {
	// eslint-disable-next-line react/destructuring-assignment
	const sname = storeName.route.params.storeName;

	function Home({ navigation }: Props2): ReactElement {
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<Text>{sname} 홈</Text>
					<Button title="매출" onPress={() => navigation.navigate('매출현황', { storeName: '매출현황' })} />
				</View>
			</SafeAreaView>
		);
	}

	function Test2page(): ReactElement {
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<Text>{sname} 매출현황</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<Manage2Stack.Navigator>
			<Manage2Stack.Screen name="홈" component={Home} />
			<Manage2Stack.Screen name="매출현황" component={Test2page} />
		</Manage2Stack.Navigator>
	);
}

const ManageStack = createNativeStackNavigator();
function ManageStackScreen(): ReactElement {
	interface Props {
		navigation: NativeStackNavigationProp<ParamListBase, '관리매장'>;
	}

	const storeList = [
		{ name: '세종마트', address: '서울특별시 광진구 군자로 98' },
		{ name: '세종대대마트', address: '서울특별시 광진구 군자로 98' },
	];

	function ManageList({ navigation }: Props): ReactElement {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.box}>
					{storeList.map((s) => {
						return (
							<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(s.name, { storeName: s.name })}>
								<View>
									<Text style={styles.btn_top}>{s.name}</Text>
									<Text style={styles.btn_bottom}>{s.address}</Text>
									<Text style={styles.btn_right}>{'>'}</Text>
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</SafeAreaView>
		);
	}

	return (
		<ManageStack.Navigator>
			<ManageStack.Screen name="관리매장" component={ManageList} />
			{storeList.map((s) => {
				return <ManageStack.Screen name={s.name} component={Manage} />;
			})}
		</ManageStack.Navigator>
	);
}

export default ManageStackScreen;
