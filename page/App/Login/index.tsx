import React, { ReactElement, useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, Alert } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { UserContext } from '../Context';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, 'Login'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function Login({ navigation }: Props): ReactElement {
	const { setName, setToken } = useContext(UserContext);

	const signIn = async () => {
		GoogleSignin.configure({
			iosClientId: '690007679691-m12da57821qgo9dbp59ud9ssm9nf0kh9.apps.googleusercontent.com',
		});
		try {
			await GoogleSignin.hasPlayServices();
			const info = await GoogleSignin.signIn();

			if (info.user.name != null) setName(info.user.name);
			if (info.idToken != null) setToken(info.idToken);

			navigation.navigate('QR');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>login</Text>
				<Button onPress={signIn} title="google" />
			</View>
		</SafeAreaView>
	);
}

export default Login;
