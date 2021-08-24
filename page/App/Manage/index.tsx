import React, { ReactElement } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function Manage(): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>Manage</Text>
			</View>
		</SafeAreaView>
	);
}

export default Manage;
