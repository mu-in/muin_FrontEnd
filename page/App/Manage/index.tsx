import React, { ReactElement, useContext, useState } from 'react';
import {
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Modal,
	View,
	Text,
	Dimensions,
	FlatList,
	Alert,
} from 'react-native';

import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { LineChart } from 'react-native-chart-kit';
import { Table, Row } from 'react-native-table-component';
import InputSpinner from 'react-native-input-spinner';
import { BlurView } from '@react-native-community/blur';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../styles/Manage';
import modal from '../../styles/Modal';
import { ServerContext, UserContext } from '../Context';

import CreateStore from './CreateStore';

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
	const { url } = useContext(ServerContext);
	const { uuid, jwt } = useContext(UserContext);
	const [storeList, setStore] = useState([{ id: 0, name: '-', address: '-' }]);

	const store = async () => {
		const res = await fetch(`${url}/store/manager/${uuid}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});

		const data = await res.json();
		console.log(data);
		setStore(data);
	};

	if (storeList[0].name === '-') {
		store();
	}

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
						<Text style={styles.border_tr}>
							<Icon name="ios-arrow-forward" size={30} />
						</Text>
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
						<Text style={styles.border_tr}>
							<Icon name="ios-arrow-forward" size={30} />
						</Text>
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
		const [allStock, setAllStock] = useState(false);
		const [createStock, setCreateStock] = useState(false);
		const [manageStock, setManageStock] = useState(false);
		const [category, setCategory] = useState('');
		const [stock, setStock] = useState([{ name: '-', quantity: 0, price: 0 }]);

		const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

		const products = [
			{
				category: '과자',
				stock: [
					{ name: '새우깡', quantity: 15, price: 1200 },
					{ name: '빼빼로', quantity: 145, price: 1300 },
				],
			},
			{
				category: '아이스크림',
				stock: [
					{ name: '빠삐코', quantity: 315, price: 800 },
					{ name: '탱크보이', quantity: 0, price: 800 },
					{ name: '젤리뽀', quantity: 9, price: 900 },
				],
			},
		];

		const onClick = (cate: string) => {
			setManageStock(true);
			setCategory(cate);
			const st = products.find((x) => x.category === cate)?.stock;
			if (st !== undefined) {
				setStock(st);
			}
		};

		return (
			<SafeAreaView style={styles.container}>
				<View style={modal.centeredView}>
					{/* 한 눈에 보기 */}
					<Modal
						animationType="slide"
						transparent
						visible={allStock}
						onRequestClose={() => {
							setAllStock(!allStock);
						}}
					>
						<View style={modal.centeredView}>
							<View style={modal.modalView}>
								<Text style={modal.modalText}>한 눈에 보기</Text>
								<TouchableOpacity style={[modal.closs]} onPress={() => setAllStock(!allStock)}>
									<Text style={modal.closs_btn}>X</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
					{/* 상품 추가 */}
					<Modal
						animationType="fade"
						transparent
						visible={createStock}
						onRequestClose={() => {
							setCreateStock(!createStock);
						}}
					>
						<BlurView style={modal.centeredView} blurType="light">
							<View style={[modal.modalView, modal.modalShort]}>
								<Text style={modal.modalText}>상품 추가</Text>
								<TouchableOpacity style={[modal.closs]} onPress={() => setCreateStock(!createStock)}>
									<Text style={modal.closs_btn}>X</Text>
								</TouchableOpacity>
								<View style={modal.container}>
									<SelectDropdown
										data={countries}
										onSelect={(selectedItem, index) => {
											console.log(selectedItem, index);
										}}
										buttonTextAfterSelection={(selectedItem, index) => {
											return selectedItem;
										}}
										rowTextForSelection={(item, index) => {
											return item;
										}}
									/>
									<Text>희희 아직안함</Text>
								</View>
							</View>
						</BlurView>
					</Modal>
					{/* 재고 관리 */}
					<Modal
						animationType="fade"
						transparent
						visible={manageStock}
						onRequestClose={() => {
							setManageStock(!manageStock);
						}}
					>
						<BlurView style={modal.centeredView} blurType="light">
							<View style={modal.modalView}>
								<Text style={modal.modalText}>{category}</Text>
								<TouchableOpacity style={[modal.closs]} onPress={() => setManageStock(!manageStock)}>
									<Text style={modal.closs_btn}>X</Text>
								</TouchableOpacity>
								<ScrollView style={modal.container}>
									{stock.map((s) => {
										return (
											<View style={modal.box}>
												<Text style={modal.stock_l}>{s.name}</Text>
												<InputSpinner
													style={modal.stock_r}
													max={9999}
													min={0}
													step={1}
													height={30}
													fontSize={20}
													value={s.quantity}
													color="#2196F3"
													colorPress="#60D937"
													onChange={(num) => {
														console.log(num);
													}}
												/>
												<Text style={modal.stock_price}>{s.price}</Text>
												{/**
												<TouchableOpacity style={[modal.change]}>
													<Text style={modal.tag_text}>변경</Text>
												</TouchableOpacity>
												 */}
												<TouchableOpacity
													style={modal.delete}
													onPress={() =>
														Alert.alert('상품 삭제', `${s.name} 을 삭제하시겠습니까?`, [
															{
																text: 'Cancel',
																style: 'cancel',
															},
															{ text: 'OK', onPress: () => console.log('OK Pressed') },
														])
													}
												>
													<Text style={modal.tag_text}>삭제</Text>
												</TouchableOpacity>
												<View style={modal.hr} />
											</View>
										);
									})}
								</ScrollView>
							</View>
						</BlurView>
					</Modal>
				</View>
				<View style={styles.box}>
					<ScrollView>
						{products.map((p) => {
							return (
								<TouchableOpacity style={styles.btn} onPress={() => onClick(p.category)}>
									<Text style={styles.tag_blue}>{p.category}</Text>
									<Text style={styles.btn_right_bold}>
										{p.stock.length} <Text style={styles.btn_right_text}> 상품</Text>
									</Text>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
					{/**
					<TouchableOpacity style={styles.btn_tl} onPress={() => setAllStock(true)}>
						<View>
							<Text style={styles.create_center_black_s}>한 눈에 보기</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn_tr} onPress={() => setCreateStock(true)}>
						<View>
							<Text style={styles.create_center_s}>상품 추가</Text>
						</View>
					</TouchableOpacity>
					 */}
					<View style={styles.bottom}>
						<TouchableOpacity style={styles.create_btn} onPress={() => setCreateStock(true)}>
							<View>
								<Text style={styles.create_center_s}>상품 추가</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	function ManageList({ navigation }: Props): ReactElement {
		const createStore = () => {
			navigation.navigate('매장추가');
		};

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.box}>
					<ScrollView style={styles.scroll}>
						{storeList.map((s) => {
							return (
								<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(s.name, { storeName: s.name })}>
									<View>
										<Text style={styles.btn_top}>{s.name}</Text>
										<Text style={styles.btn_bottom}>{s.address}</Text>
										<Text style={styles.btn_right}>
											<Icon name="ios-arrow-forward" size={30} />
										</Text>
									</View>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
					<View style={styles.create}>
						<TouchableOpacity
							style={styles.refresh}
							onPress={() => Alert.alert('재조회', `재조회 되었습니다.`, [{ text: '확인', onPress: () => store() }])}
						>
							<View>
								<Text style={styles.refresh_text}>
									<Icon name="refresh" size={30} />
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.create_btn} onPress={() => createStore()}>
							<View>
								<Text style={styles.create_center_s}>매장 추가</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<ManageStack.Navigator>
			<ManageStack.Screen name="관리매장" component={ManageList} />
			<ManageStack.Screen name="매장추가" component={CreateStore} />
			<ManageStack.Screen name="최근거래" component={Sales} />
			<ManageStack.Screen name="재고관리" component={Stock} />
			{storeList.map((s) => {
				return <ManageStack.Screen name={s.name} component={Home} />;
			})}
		</ManageStack.Navigator>
	);
}

export default ManageStackScreen;
