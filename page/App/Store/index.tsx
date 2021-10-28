import React, { ReactElement, useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Table, Row } from 'react-native-table-component';

import Geolocation from '@react-native-community/geolocation';

import { UserContext } from '../Context';

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
		};
		path: string;
	};
}

function StoreInfo(storeName: navigatorProps): ReactElement {
	// eslint-disable-next-line react/destructuring-assignment
	const market = storeName.route.params.storeName;
	const info = {
		name: market,
		keyword: ['과자', '음료수', '아이스크림'],
		address: '서울특별시 광진구 군자로 98',
		products: [
			{
				category: '아이스크림',
				name: '탱크보이',
				quantity: 5,
				price: 1200,
			},
			{
				category: '아이스크림',
				name: '폴라포',
				quantity: 12,
				price: 1300,
			},
			{
				category: '과자',
				name: '새우깡',
				quantity: 12,
				price: 1500,
			},
		],
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.width100}>
				<View style={styles.info}>
					<Text style={styles.info_top}>{info.name}</Text>
					<Text style={styles.info_mid}>{info.address}</Text>
					<Text style={styles.info_bot}>
						{info.keyword.map((key) => {
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
							{info.products.map((p) => {
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
						{ id: 4, storeName: '세종마트2' },
						{ id: 5, storeName: '세계로마트1' },
						{ id: 6, storeName: '하모니마3트' },
						{ id: 7, storeName: '세종5마트' },
						{ id: 8, storeName: '세계7로마트' },
						{ id: 9, storeName: '하모2니마트' },
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
