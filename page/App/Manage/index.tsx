import React, { ReactElement } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

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

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, '관리매장'>;
}
interface Props2 {
	navigation: NativeStackNavigationProp<ParamListBase, '홈'>;
}
interface Props3 {
	navigation: NativeStackNavigationProp<ParamListBase, '매출현황'>;
}

const ManageStack = createNativeStackNavigator();
function ManageStackScreen(): ReactElement {
	const storeList = [
		{ name: '세종마트', address: '서울특별시 광진구 군자로 98' },
		{ name: '세종대대마트', address: '서울특별시 광진구 군자로 98' },
	];

	function Home({ navigation }: Props2): ReactElement {
		const storeName = navigation.getState().routes[1].name;
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<Text>{storeName} 홈</Text>
					<Button title="매출" onPress={() => navigation.navigate('매출현황')} />
				</View>
			</SafeAreaView>
		);
	}

	function Sales({ navigation }: Props3): ReactElement {
		const storeName = navigation.getState().routes[1].name;
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<Text>{storeName} 매출현황</Text>
				</View>
			</SafeAreaView>
		);
	}

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
			<ManageStack.Screen name="매출현황" component={Sales} />
			{storeList.map((s) => {
				return <ManageStack.Screen name={s.name} component={Home} />;
			})}
		</ManageStack.Navigator>
	);
}

export default ManageStackScreen;
