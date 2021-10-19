import React, { ReactElement, useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import GeoLocation from '../../../components/GeoLocation';
import { UserContext } from '../Context';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, '주변매장'>;
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
});

function StoreInfo(storeName: string): ReactElement {
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
	const market = [
		{ id: 1, storeName: '세종마트' },
		{ id: 2, storeName: '세종대왕마트' },
	];

	function Store({ navigation }: Props): ReactElement {
		const { name } = useContext(UserContext);
		const [meter, setMeter] = useState('500 m');

		const onPress = () => {
			if (meter === '500 m') setMeter('1 km');
			else if (meter === '1 km') setMeter('2 km');
			else setMeter('500 m');
		};

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.top}>
					<View style={styles.top_l}>
						<Text style={styles.bold_black}>{name}님</Text>
						<Text>근처 무인매장</Text>
					</View>
					<View style={styles.top_r}>
						<TouchableOpacity onPress={onPress} style={styles.displacement}>
							<Text style={styles.bold_blue}>{meter}</Text>
							<Text>이내</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.box}>
					<GeoLocation />
					{market.map((store) => {
						return (
							<Button
								title={store.storeName}
								onPress={() => navigation.navigate(store.storeName, { storeName: store.storeName })}
								key={store.id}
							/>
						);
					})}
				</View>
			</SafeAreaView>
		);
	}

	return (
		<StoreStack.Navigator>
			<StoreStack.Screen name="주변매장" component={Store} />
			{market.map((store) => {
				return <StoreStack.Screen name={store.storeName} component={StoreInfo} />;
			})}
		</StoreStack.Navigator>
	);
}

export default StoreStackScreen;
