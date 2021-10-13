import React, { ReactElement } from 'react';
import { SafeAreaView, View, StyleSheet, Button, Text } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, '재고관리'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function ManageStock({ navigation }: Props): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>재고관리</Text>
			</View>
		</SafeAreaView>
	);
}

export default ManageStock;
