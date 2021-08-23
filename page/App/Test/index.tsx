import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import TextItem from '../../../components/Test';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, 'Test'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function Test({ navigation }: Props): ReactElement {
	return (
		<View style={styles.container}>
			<TextItem text="Test" />
		</View>
	);
}

export default Test;
