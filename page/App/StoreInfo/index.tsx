import React, { ReactElement } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, 'StoreInfo'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function StoreInfo({ navigation }: Props): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>Store</Text>
				<Button title="Go to Store List" onPress={() => navigation.navigate('StoreList')} />
			</View>
		</SafeAreaView>
	);
}

export default StoreInfo;
