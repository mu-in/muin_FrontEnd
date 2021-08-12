import React, { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import TextItem from '../../components/Test';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function App(): ReactElement {
	return (
		<View style={styles.container}>
			<TextItem text="Hello world from React Naitve Web" />
		</View>
	);
}

export default App;
