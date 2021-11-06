/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement, useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Table, Row } from 'react-native-table-component';

import Geolocation from '@react-native-community/geolocation';
import { ServerContext, UserContext } from '../Context';
import styles from '../../styles/Store';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, '주변매장'>;
}

interface navigatorProps {
	route: {
		key: string;
		name: string;
		params: {
			storeName: string;
			id: number;
		};
		path: string;
	};
}

function StoreInfo(storeName: navigatorProps): ReactElement {
	const { url } = useContext(ServerContext);
	const { jwt } = useContext(UserContext);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const market = storeName.route.params.storeName;
	const market_id = storeName.route.params.id;

	const [name, setName] = useState('-');
	const [keyword, setKey] = useState(['-']);
	const [address, setAddress] = useState('-');
	const [products, setProduct] = useState([{ category: '-', name: '-', quantity: 0, price: 0 }]);

	const server = async () => {
		console.log(`${url}/store/${market_id}`);
		const res = await fetch(`${url}/store/${market_id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});

		const data = await res.json();
		console.log(data);
		setName(data.name);
		setKey(data.keywords);
		setAddress(data.address);
		setProduct(data.stocks);
	};

	if (name === '-') {
		server();
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.width100}>
				<View style={styles.info}>
					<Text style={styles.info_top}>{name}</Text>
					<Text style={styles.info_mid}>{address}</Text>
					<Text style={styles.info_bot}>
						{keyword.map((key) => {
							return `#${key}  `;
						})}
					</Text>
				</View>
				<View style={styles.product}>
					<Text style={styles.info_top}>매장 재고</Text>
					<View style={styles.tbl}>
						<Table borderStyle={{ borderWidth: 1, borderColor: '#D5D5D5' }}>
							<Row
								data={['대분류', '상품명', '가격', '재고']}
								flexArr={[2, 5, 2, 1]}
								style={styles.tbl_head}
								textStyle={styles.tbl_head_text}
							/>
							{products.map((p) => {
								return (
									<Row
										data={[p.category, p.name, p.price, p.quantity]}
										flexArr={[2, 5, 2, 1]}
										style={styles.tbl_row}
										textStyle={styles.tbl_row_text}
									/>
								);
							})}
						</Table>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const StoreStack = createNativeStackNavigator();
function StoreStackScreen(): ReactElement {
	const [store, setStore] = useState([
		{
			address: '-',
			distance: 0,
			managerName: null,
			name: '-',
			id: 0,
		},
	]);
	const [meter, setMeter] = useState('조회');
	const { jwt } = useContext(UserContext);
	const { url } = useContext(ServerContext);

	const location = () => {
		Geolocation.getCurrentPosition(
			async (position) => {
				const lati = JSON.stringify(position.coords.latitude);
				const longi = JSON.stringify(position.coords.longitude);

				if (meter === '조회') {
					setMeter('500 m');

					const res = await fetch(
						`${url}/stores/location?lat=${37.55085776427549}&lon=${127.07542715582301}&distance=${0.5}`,
						{
							method: 'GET',
							headers: { Authorization: `Bearer ${jwt}` },
						}
					);

					const data = await res.json();
					setStore(data);
				}
				if (meter === '500 m') {
					setMeter('1 km');

					const res = await fetch(
						`${url}/stores/location?lat=${37.55085776427549}&lon=${127.07542715582301}&distance=${1}`,
						{
							method: 'GET',
							headers: { Authorization: `Bearer ${jwt}` },
						}
					);

					const data = await res.json();
					setStore(data);
				} else if (meter === '1 km') {
					setMeter('2 km');

					const res = await fetch(
						`${url}/stores/location?lat=${37.55085776427549}&lon=${127.07542715582301}&distance=${2}`,
						{
							method: 'GET',
							headers: { Authorization: `Bearer ${jwt}` },
						}
					);

					const data = await res.json();
					setStore(data);
				} else {
					setMeter('500 m');

					const res = await fetch(
						`${url}/stores/location?lat=${37.55085776427549}&lon=${127.07542715582301}&distance=${0.5}`,
						{
							method: 'GET',
							headers: { Authorization: `Bearer ${jwt}` },
						}
					);

					const data = await res.json();
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
										onPress={() => navigation.navigate(s.name, { storeName: s.name, id: s.id })}
									>
										<Text style={styles.btn_top}>{s.name.split('_')[0]}</Text>
										<Text style={styles.btn_bottom}>{s.address}</Text>
										<Text style={styles.btn_right}>{`${Math.round(s.distance * 1000).toString()} m`}</Text>
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
				return <StoreStack.Screen name={s.name} component={StoreInfo} />;
			})}
		</StoreStack.Navigator>
	);
}

export default StoreStackScreen;
