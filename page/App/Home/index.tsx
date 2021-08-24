import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { SafeAreaView, View, StyleSheet, Button, Text } from 'react-native';

import QR from '../../../components/QR';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, 'Home'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function Home({ navigation }: Props): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>Home</Text>
				<QR />
				<Button title="Go to Test" onPress={() => navigation.navigate('Test')} />
			</View>
		</SafeAreaView>
	);
}

export default Home;
