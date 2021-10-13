import React, { ReactElement } from 'react';
import { SafeAreaView, View, StyleSheet, Button, Text } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, '최근거래'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function TransactionHistory({ navigation }: Props): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>거래내역</Text>
			</View>
		</SafeAreaView>
	);
}

export default TransactionHistory;
