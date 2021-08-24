import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, 'StoreList'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function StoreList({ navigation }: Props): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>Store List</Text>
				<Button title="Go to Store List" onPress={() => navigation.navigate('StoreInfo')} />
			</View>
		</SafeAreaView>
	);
}

export default StoreList;
