import React, { ReactElement } from 'react';
import { SafeAreaView, View, StyleSheet, Button } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
				<QR />
			</View>
			<Button title="매니저 인증" onPress={() => navigation.navigate('매니저 인증')} />
		</SafeAreaView>
	);
}

export default Home;
