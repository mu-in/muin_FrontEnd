import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import TextItem from '../../../components/Test';

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
		<View style={styles.container}>
			<TextItem text="Home" />
			<Button title="Go to Test" onPress={() => navigation.navigate('Test')} />
		</View>
	);
}

export default Home;
