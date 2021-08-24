import React, { ReactElement } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import QR from '../../../components/QR';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function Home(): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<QR />
			</View>
		</SafeAreaView>
	);
}

export default Home;
