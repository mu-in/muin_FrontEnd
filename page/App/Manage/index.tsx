/* eslint-disable react/no-array-index-key */
import React, { ReactElement, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ManageHome from './ManageHome';
import ManageStock from './ManageStock';
import TransactionHistory from './TransactionHistory';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const ManageStack = createNativeStackNavigator();

function ManageStackScreen(): ReactElement {
	const [stack, setStack] = useState(<></>);

	const onClick = () => {
		console.log('click');
	};

	function Manage(): ReactElement {
		const store = [{ name: '세종마트' }, { name: '세종대마트' }];

		return (
			<SafeAreaView style={styles.container}>
				<View>
					<Text>Manage</Text>
					{store.map((s, index) => (
						<Button key={index} onPress={onClick} title={s.name} />
					))}
				</View>
			</SafeAreaView>
		);
	}

	return (
		<ManageStack.Navigator>
			<ManageStack.Screen name="매장관리" component={Manage} />
		</ManageStack.Navigator>
	);
}

export default ManageStackScreen;
