import React, { ReactElement } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LineChart } from 'react-native-chart-kit';
import { Table, Row } from 'react-native-table-component';

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
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
		marginBottom: 0,
		height: 80,
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
	btn_right_bold: {
		position: 'absolute',
		right: 30,
		top: 23,
		color: '#298FFF',
		fontWeight: 'bold',
		fontSize: 25,
	},
	btn_right_text: {
		fontSize: 15,
		color: '#5E5E5E',
	},
	create_btn: {
		borderRadius: 18,
		backgroundColor: '#298FFF',
		margin: 20,
		marginBottom: 0,
		height: 60,
	},
	create_center: {
		textAlign: 'center',
		marginTop: 20,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#ffffff',
	},
	sales: {
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
	},
	border_t: {
		margin: 20,
		marginBottom: 0,
		fontWeight: 'bold',
		fontSize: 18,
	},
	border_tr: {
		position: 'absolute',
		right: 30,
		top: 15,
		color: '#298FFF',
		fontWeight: 'bold',
		fontSize: 20,
	},
	tbl: {
		margin: 20,
	},
	tbl_row: {
		height: 25,
		textAlign: 'center',
	},
	tbl_text: {
		color: '#5E5E5E',
		fontSize: 10,
	},
	real: {
		margin: 20,
		marginTop: 0,
	},
	real_l: {
		position: 'absolute',
		top: 0,
		left: 0,
		borderRadius: 18,
		backgroundColor: '#ffffff',
		width: '48%',
	},
	real_r: {
		position: 'absolute',
		top: 0,
		right: 0,
		borderRadius: 18,
		backgroundColor: '#ffffff',
		width: '48%',
	},
	real_pay: {
		margin: 20,
		textAlign: 'center',
		color: '#5E5E5E',
		fontSize: 23,
	},
	statics: {
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
		marginTop: 110,
		height: 300,
	},
	graph: {
		marginTop: 20,
	},
	stock: {
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
		marginTop: 0,
		height: 120,
	},
	stock_tag: {
		margin: 20,
	},
	stock_l: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '48%',
	},
	stock_r: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: '48%',
	},
	tag_text: {
		position: 'absolute',
		top: 5,
		left: 75,
		color: '#5E5E5E',
		fontSize: 15,
	},
	tag_red: {
		backgroundColor: '#ED220D',
		borderWidth: 1,
		borderColor: '#ED220D',
		borderRadius: 10,
		overflow: 'hidden',
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		margin: 5,
		color: '#ffffff',
		fontSize: 15,
		fontWeight: 'bold',
		width: 60,
	},
	tag_yellow: {
		backgroundColor: '#FEAE00',
		borderWidth: 1,
		borderColor: '#FEAE00',
		borderRadius: 10,
		overflow: 'hidden',
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		margin: 5,
		color: '#ffffff',
		fontSize: 15,
		fontWeight: 'bold',
		width: 60,
	},
	tag_blue: {
		position: 'absolute',
		left: 20,
		top: 20,
		backgroundColor: '#298FFF',
		borderWidth: 1,
		borderColor: '#298FFF',
		borderRadius: 10,
		overflow: 'hidden',
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		margin: 5,
		color: '#ffffff',
		fontSize: 15,
		fontWeight: 'bold',
	},
	red: {
		fontWeight: 'bold',
		color: '#ED220D',
		fontSize: 20,
	},
	yellow: {
		fontWeight: 'bold',
		color: '#FEAE00',
		fontSize: 20,
	},
	allSales: {
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
		height: '100%',
	},
	tbl_pay: {
		marginLeft: 30,
		marginRight: 20,
	},
	margin_t: {
		marginTop: 20,
	},
});

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, '관리매장'>;
}
interface Props2 {
	navigation: NativeStackNavigationProp<ParamListBase, '홈'>;
}
interface Props3 {
	navigation: NativeStackNavigationProp<ParamListBase, '최근거래'>;
}
interface Props4 {
	navigation: NativeStackNavigationProp<ParamListBase, '재고관리'>;
}

const ManageStack = createNativeStackNavigator();
function ManageStackScreen(): ReactElement {
	const now = new Date();

	const storeList = [
		{ name: '세종마트', address: '서울특별시 광진구 군자로 98' },
		{ name: '세종대대마트', address: '서울특별시 광진구 군자로 98' },
	];

	function Home({ navigation }: Props2): ReactElement {
		const storeName = navigation.getState().routes[1].name;
		const recentPayments = [
			{ time: '21.10.30 21:40', price: '6,400' },
			{ time: '21.10.30 21:07', price: '1,200' },
			{ time: '21.10.30 20:40', price: '5,900' },
			{ time: '21.10.30 18:42', price: '11,200' },
			{ time: '21.10.30 16:20', price: '5,200' },
		];
		const statistics = [
			{ month: 3, sales: 1645712 },
			{ month: 4, sales: 2345412 },
			{ month: 5, sales: 1756712 },
			{ month: 6, sales: 1235712 },
			{ month: 7, sales: 1834412 },
			{ month: 8, sales: 2265712 },
		];

		const graphMonth = statistics.map((s) => `${s.month.toString()}월`);
		const graphSale = statistics.map((s) => s.sales / 10000);

		const chartData = {
			labels: graphMonth,
			datasets: [
				{
					data: graphSale,
					color: (opacity = 1) => `rgba(0, 162, 0, ${opacity})`, // optional
					strokeWidth: 2, // optional
				},
			],
		};

		const chartConfig = {
			backgroundGradientFrom: '#ffffff',
			backgroundGradientTo: '#ffffff',
			decimalPlaces: 0, // optional, defaults to 2dp,
			color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
			labelColor: (opacity = 1) => `rgba(94, 94, 94, ${opacity})`,
			style: {
				borderRadius: 15,
			},
			propsForDots: {
				r: '6',
				strokeWidth: '2',
				stroke: '#00A2FF',
			},
		};

		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.box}>
					<TouchableOpacity style={styles.sales} onPress={() => navigation.navigate('최근거래')}>
						<Text style={styles.border_t}>최근 거래</Text>
						<Text style={styles.border_tr}>{'>'}</Text>
						<Table style={styles.tbl} borderStyle={{ borderWidth: 1, borderColor: '#ffffff' }}>
							{recentPayments.map((p) => {
								return (
									<Row
										data={[p.time, storeName, p.price, '카드 (승인)']}
										flexArr={[2, 2, 1, 1.5]}
										style={styles.tbl_row}
										textStyle={styles.tbl_text}
									/>
								);
							})}
						</Table>
					</TouchableOpacity>
					<View style={styles.real}>
						<View style={styles.real_l}>
							<Text style={styles.border_t}>오늘 매출</Text>
							<Text style={styles.real_pay}>{(123456).toLocaleString('ko-KR', { maximumFractionDigits: 4 })}</Text>
						</View>
						<View style={styles.real_r}>
							<Text style={styles.border_t}>{now.getMonth() + 1}월 매출</Text>
							<Text style={styles.real_pay}>{(12345678).toLocaleString('ko-KR', { maximumFractionDigits: 4 })}</Text>
						</View>
					</View>
					<View style={styles.statics}>
						<Text style={styles.border_t}>매출 통계</Text>
						<View style={styles.graph}>
							<LineChart
								data={chartData}
								width={Dimensions.get('window').width * 0.85}
								height={220}
								chartConfig={chartConfig}
							/>
						</View>
					</View>
					<TouchableOpacity style={styles.stock} onPress={() => navigation.navigate('재고관리')}>
						<Text style={styles.border_t}>매장 재고</Text>
						<Text style={styles.border_tr}>{'>'}</Text>
						<View style={styles.stock_tag}>
							<View style={styles.stock_l}>
								<Text style={styles.tag_red}>품절</Text>
								<Text style={styles.tag_text}>
									<Text style={styles.red}>15 </Text> 상품
								</Text>
							</View>
							<View style={styles.stock_r}>
								<Text style={styles.tag_yellow}>부족</Text>
								<Text style={styles.tag_text}>
									<Text style={styles.yellow}>15 </Text> 상품
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		);
	}

	function Sales({ navigation }: Props3): ReactElement {
		const storeName = navigation.getState().routes[1].name;
		interface data {
			item: { time: string; price: string };
		}
		const recentPayments = [
			{ time: '21.10.30 21:40', price: '6,400' },
			{ time: '21.10.30 21:07', price: '1,200' },
			{ time: '21.10.30 20:40', price: '5,900' },
			{ time: '21.10.30 18:42', price: '11,200' },
			{ time: '21.10.30 16:20', price: '5,200' },
		];
		const row = ({ item }: data) => {
			return (
				<Table style={styles.tbl_pay} borderStyle={{ borderWidth: 1, borderColor: '#ffffff' }}>
					<Row
						data={[item.time, storeName, item.price, '카드 (승인)']}
						flexArr={[2, 2, 1, 1.5]}
						style={styles.tbl_row}
						textStyle={styles.tbl_text}
					/>
				</Table>
			);
		};

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.box}>
					<View style={styles.allSales}>
						<Text style={styles.border_t}>거래 내역</Text>
						<View style={styles.margin_t}>
							<FlatList data={recentPayments} renderItem={row} keyExtractor={(item) => item.time} />
						</View>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	function Stock({ navigation }: Props4): ReactElement {
		const storeName = navigation.getState().routes[1].name;
		const products = [
			{
				category: '과자',
				stock: [
					{ name: '새우깡', quantity: 15 },
					{ name: '빼빼로', quantity: 145 },
				],
			},
			{
				category: '아이스크림',
				stock: [
					{ name: '빠삐코', quantity: 315 },
					{ name: '탱크보이', quantity: 0 },
					{ name: '젤리뽀', quantity: 9 },
				],
			},
		];

		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.box}>
					{products.map((p) => {
						return (
							<TouchableOpacity style={styles.btn}>
								<Text style={styles.tag_blue}>{p.category}</Text>
								<Text style={styles.btn_right_bold}>
									{p.stock.length} <Text style={styles.btn_right_text}>상품</Text>
								</Text>
							</TouchableOpacity>
						);
					})}

					<TouchableOpacity style={styles.create_btn}>
						<View>
							<Text style={styles.create_center}>상품 추가</Text>
						</View>
					</TouchableOpacity>
				</ScrollView>
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
			<ManageStack.Screen name="최근거래" component={Sales} />
			<ManageStack.Screen name="재고관리" component={Stock} />
			{storeList.map((s) => {
				return <ManageStack.Screen name={s.name} component={Home} />;
			})}
		</ManageStack.Navigator>
	);
}

export default ManageStackScreen;
