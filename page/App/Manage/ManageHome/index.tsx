import React, { ReactElement } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, '세종마트'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function ManageHome({ navigation }: Props): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>ManageHome</Text>
				<Button title="최근거래" onPress={() => navigation.navigate('최근거래')} />
				<Button title="재고관리" onPress={() => navigation.navigate('재고관리')} />
			</View>
		</SafeAreaView>
	);
}

export default ManageHome;
