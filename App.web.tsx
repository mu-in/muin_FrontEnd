import React, { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import TextItem from './components/Test';

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
			<TextItem text="Hello world from React Web" />
		</View>
	);
}

export default Web;
