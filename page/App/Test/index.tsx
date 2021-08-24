import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

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
		<SafeAreaView style={styles.container}>
			<View>
				<Text>Test</Text>
			</View>
		</SafeAreaView>
	);
}

export default Test;
