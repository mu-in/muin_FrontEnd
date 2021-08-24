import React, { ReactElement } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function Web(): ReactElement {
	return (
		<View style={styles.container}>
			<Text>Hello world from React Web</Text>
		</View>
	);
}

export default Web;
