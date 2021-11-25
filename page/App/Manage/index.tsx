/* eslint-disable @typescript-eslint/no-unused-vars */
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
		setStore(data);
	};

	if (storeList[0].name === '-') {
		store();
	}

	function Home({ navigation }: Props2): ReactElement {
		const storeName = navigation.getState().routes[1].name;
		const { id } = navigation.getState().routes[1].params;

		const [recentPayments, setRecent] = useState([{ time: '-', price: '-' }]);
		const [statistics, setStatis] = useState([{ month: 0, sales: 0 }]);
		const [month, setMonth] = useState(0);
		const [today, setToday] = useState(0);
		const [soldOut, setSoldout] = useState(0);
		const [shortage, setShortage] = useState(0);

		const getHome = async () => {
			const res = await fetch(`${url}/store/${id}/home`, {
				// 홈 api 확인 id =1
				method: 'GET',
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});

			const data = await res.json();
			console.log(data);
			if (data.sales.recentPayments.length !== 0) {
				setRecent(data.sales.recentPayments);
			}
			if (data.sales.statistics.length !== 0) {
				setStatis(data.sales.statistics);
			}
			setMonth(data.sales.month);
			setToday(data.sales.today);
			setSoldout(data.sales.stockStatus.soldOut);
			setShortage(data.sales.stockStatus.shortage);
		};

		if (recentPayments.length <= 1) {
			getHome();
		}

		const graphMonth = statistics.map((s) => `${s.month.toString().split('-')[1]}월`);
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
					<TouchableOpacity style={styles.sales} onPress={() => navigation.navigate('최근거래', { id })}>
						<Text style={styles.border_t}>최근 거래</Text>
						<Text style={styles.border_tr}>
							<Icon name="ios-arrow-forward" size={30} />
						</Text>
						<Table style={styles.tbl} borderStyle={{ borderWidth: 1, borderColor: '#ffffff' }}>
							{recentPayments.map((p) => {
								return (
									<Row
										data={[p.time, storeName, p.price, '카드 (승인)']}
										flexArr={[2, 1.5, 1, 1]}
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
							<Text style={styles.real_pay}>{today}</Text>
						</View>
						<View style={styles.real_r}>
							<Text style={styles.border_t}>{now.getMonth() + 1}월 매출</Text>
							<Text style={styles.real_pay}>{month}</Text>
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
					<TouchableOpacity style={styles.stock} onPress={() => navigation.navigate('재고관리', { id })}>
						<Text style={styles.border_t}>매장 재고</Text>
						<Text style={styles.border_tr}>
							<Icon name="ios-arrow-forward" size={30} />
						</Text>
						<View style={styles.stock_tag}>
							<View style={styles.stock_l}>
								<Text style={styles.tag_red}>품절</Text>
								<Text style={styles.tag_text}>
									<Text style={styles.red}>{soldOut} </Text> 상품
								</Text>
							</View>
							<View style={styles.stock_r}>
								<Text style={styles.tag_yellow}>부족</Text>
								<Text style={styles.tag_text}>
									<Text style={styles.yellow}>{shortage} </Text> 상품
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
		const { id } = navigation.getState().routes[1].params;

		interface data {
			item: { time: string; price: string };
		}
		const [recentPayments, setRecent] = useState([{ time: '-', price: '-' }]);

		const getSales = async () => {
			const res = await fetch(`${url}/store/${id}/payments`, {
				// 홈 api 확인 id =1
				method: 'GET',
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});

			const da = await res.json();
			console.log(da);
			if (da.payments.length !== 0) {
				setRecent(da.payments);
			}
		};

		if (recentPayments[0].time === '-') {
			getSales();
		}

		const row = ({ item }: data) => {
			return (
				<Table style={styles.tbl_pay} borderStyle={{ borderWidth: 1, borderColor: '#ffffff' }}>
					<Row
						data={[item.time, storeName, item.price, '카드 (승인)']}
						flexArr={[2, 1.5, 1, 1]}
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
		const { id } = navigation.getState().routes[1].params;

		const [allStock, setAllStock] = useState(false);
		const [createStock, setCreateStock] = useState(false);
		const [manageStock, setManageStock] = useState(false);
		const [category, setCategory] = useState('');
		const [stock, setStock] = useState([{ id: 0, name: '-', quantity: 0, price: 0 }]);

		const [select, setSel] = useState(['-']);
		const [select2, setSel2] = useState(['-']);
		const [product, setPro] = useState([[{ id: 0, name: '-', price: 0 }]]);

		const [index1, setIndex1] = useState(-1);
		const [index2, setIndex2] = useState(-1);
		const [num, setNum] = useState(0);

		const getSelector = async () => {
			const res = await fetch(`${url}/products`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});

			const data = await res.json();
			setSel(data.map((d: { category: string }) => d.category));
			setPro(data.map((d: { products: string[] }) => d.products));
		};

		if (select[0] === '-') {
			getSelector();
		}

		const [products, setProducts] = useState([
			{ category: '-', stocks: [{ id: 0, name: '-', quantity: 0, price: 0 }] },
		]);

		const getProducts = async () => {
			const res = await fetch(`${url}/store/${id}/stocks`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});

			const data = await res.json();
			setProducts(data.products);
		};

		if (product.length === 1) {
			// eslint-disable-next-line array-callback-return
			products.map((p) => {
				if (p.category === '-') {
					getProducts();
				}
			});
		}

		const onClick = (cate: string) => {
			setManageStock(true);
			setCategory(cate);
			const st = products.find((x) => x.category === cate)?.stocks;
			if (st !== undefined) {
				setStock(st);
			}
		};

		const pushProducts = async () => {
			const res = await fetch(`${url}/store/${id}/stock`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${jwt}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					productId: product[index1][index2].id,
					quantity: num,
				}),
			});

			console.log(product[index1][index2].id);
			const data = await res.json();
			console.log(data);
			getProducts();

			setCreateStock(false);
		};

		const updateProduct = async ({ stockId, number }: { stockId: number; number: number }) => {
			const res = await fetch(`${url}/store/${id}/stock/${stockId}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${jwt}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					quantity: number,
				}),
			});
			const data = await res.json();
			console.log(data);
			getProducts();
		};

		const deleteProduct = async ({ stockId, cate }: { stockId: number; cate: string }) => {
			const res = await fetch(`${url}/store/${id}/stock/${stockId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const data = await res.json();
			console.log(data);
			getProducts();
			Alert.alert('삭제 완료', `재고 삭제가 요청되었습니다.`, [{ text: 'OK', onPress: () => setManageStock(false) }]);
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
									<View style={modal.selector}>
										<SelectDropdown
											data={select}
											defaultButtonText="category"
											onSelect={(selectedItem, index) => {
												setSel2(product[index].map((p) => p.name));
												setIndex1(index);
											}}
											buttonTextAfterSelection={(selectedItem) => {
												return selectedItem;
											}}
											rowTextForSelection={(item) => {
												return item;
											}}
										/>
									</View>
									<View style={modal.selector}>
										<SelectDropdown
											data={select2}
											defaultButtonText="product"
											onSelect={(selectedItem, index) => {
												setIndex2(index);
											}}
											buttonTextAfterSelection={(selectedItem) => {
												return selectedItem;
											}}
											rowTextForSelection={(item) => {
												return item;
											}}
										/>
									</View>
									<View style={modal.selector}>
										<InputSpinner
											max={9999}
											min={0}
											step={1}
											height={30}
											fontSize={20}
											width={150}
											value={0}
											color="#2196F3"
											colorPress="#60D937"
											onChange={(n) => {
												setNum(n);
											}}
										/>
									</View>
									<View style={modal.bottom}>
										<TouchableOpacity style={styles.create_btn} onPress={() => pushProducts()}>
											<View>
												<Text style={styles.create_center_s}>상품 추가</Text>
											</View>
										</TouchableOpacity>
									</View>
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
													onChange={(n) => {
														updateProduct({ stockId: s.id, number: n });
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
															{ text: 'OK', onPress: () => deleteProduct({ stockId: s.id, cate: category }) },
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
							if (p.category === '-') {
								return <></>;
							}
							return (
								<TouchableOpacity style={styles.btn} onPress={() => onClick(p.category)}>
									<Text style={styles.tag_blue}>{p.category}</Text>
									<Text style={styles.btn_right_bold}>
										{p.stocks.length} <Text style={styles.btn_right_text}> 상품</Text>
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
								<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(s.name, { id: s.id })}>
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
