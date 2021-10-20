import React, { ReactElement, useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Geolocation from '@react-native-community/geolocation';
import { UserContext } from '../Context';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, '주변매장'>;
}

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
		backgroundColor: '#ffffff',
	},
	top: {
		position: 'absolute',
		top: 0,
		width: '100%',
	},
	top_l: {
		margin: 50,
		position: 'absolute',
		left: 0,
	},
	top_r: {
		margin: 30,
		position: 'absolute',
		right: 0,
	},
	box: {
		backgroundColor: '#F2F2F2',
		width: '100%',
		position: 'absolute',
		bottom: 0,
		height: '78%',
	},
	displacement: {
		width: 90,
		height: 90,
		backgroundColor: '#DAEBF5',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bold_blue: {
		color: '#0076BA',
		fontWeight: 'bold',
		fontSize: 15,
	},
	bold_black: {
		color: '#000000',
		fontWeight: 'bold',
		fontSize: 20,
	},
	center: {
		textAlign: 'center',
		fontSize: 15,
		marginTop: 150,
		lineHeight: 25,
		color: '#5E5E5E',
	},
	btn: {
		height: 80,
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 10,
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

function StoreInfo(storeName: navigatorProps): ReactElement {
	// eslint-disable-next-line react/destructuring-assignment
	const market = storeName.route.params.storeName;

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>{market}</Text>
			</View>
		</SafeAreaView>
	);
}

const StoreStack = createNativeStackNavigator();
function StoreStackScreen(): ReactElement {
	const [store, setStore] = useState([{ id: 0, storeName: '-' }]);
	const [meter, setMeter] = useState('조회');

	const location = () => {
		let m;
		Geolocation.getCurrentPosition(
			(position) => {
				const lati = JSON.stringify(position.coords.latitude);
				const longi = JSON.stringify(position.coords.longitude);

				if (meter === '조회') {
					setMeter('500 m');
					m = 500;
					// 뭔가 여기서 서버에서 가져와
					const data = [{ id: 1, storeName: '세종마트' }]; // 예시
					setStore(data);
				}
				if (meter === '500 m') {
					setMeter('1 km');
					m = 1000;
					// 예시
					const data = [
						{ id: 1, storeName: '세종마트' },
						{ id: 2, storeName: '세계로마트' },
					];
					setStore(data);
				} else if (meter === '1 km') {
					setMeter('2 km');
					m = 2000;
					// 예시
					const data = [
						{ id: 1, storeName: '세종마트' },
						{ id: 2, storeName: '세계로마트' },
						{ id: 3, storeName: '하모니마트' },
					];
					setStore(data);
				} else {
					setMeter('500 m');
					m = 500;
					// 예시
					const data = [{ id: 1, storeName: '세종마트' }];
					setStore(data);
				}
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		);
	};

	function Store({ navigation }: Props): ReactElement {
		const { name } = useContext(UserContext);

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.top}>
					<View style={styles.top_l}>
						<Text style={styles.bold_black}>{name}님</Text>
						<Text>근처 무인매장</Text>
					</View>
					<View style={styles.top_r}>
						<TouchableOpacity onPress={location} style={styles.displacement}>
							<Text style={styles.bold_blue}>{meter}</Text>
							{meter !== '조회' ? <Text>이내</Text> : null}
						</TouchableOpacity>
					</View>
				</View>
				<ScrollView style={styles.box}>
					{store.map((s) => {
						return (
							<View>
								{s.id === 0 ? (
									<Text style={styles.center}>{'사용자 위치 권한 승인 후\n매장 조회가 가능합니다.'}</Text>
								) : (
									<TouchableOpacity
										key={s.id}
										style={styles.btn}
										onPress={() => navigation.navigate(s.storeName, { storeName: s.storeName })}
									>
										<Text style={styles.btn_top}>{s.storeName}</Text>
										<Text style={styles.btn_bottom}>서울특별시 광진구 군자로 98</Text>
										<Text style={styles.btn_right}>29 m</Text>
									</TouchableOpacity>
								)}
							</View>
						);
					})}
				</ScrollView>
			</SafeAreaView>
		);
	}

	return (
		<StoreStack.Navigator>
			<StoreStack.Screen name="주변매장" component={Store} />
			{store.map((s) => {
				return <StoreStack.Screen name={s.storeName} component={StoreInfo} />;
			})}
		</StoreStack.Navigator>
	);
}

export default StoreStackScreen;
