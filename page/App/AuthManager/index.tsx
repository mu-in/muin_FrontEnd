import React, { ReactElement } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, '매니저 인증'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function AuthManager({ navigation }: Props): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>auth</Text>
			</View>
		</SafeAreaView>
	);
}

export default AuthManager;
