import React, { ReactElement } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import GeoLocation from '../../../components/GeoLocation';

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

function Store({ navigation }: Props): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<GeoLocation />
				<Text>Store List</Text>
				<Button title="Go to Store info" onPress={() => navigation.navigate('StoreInfo')} />
			</View>
		</SafeAreaView>
	);
}

export default Store;