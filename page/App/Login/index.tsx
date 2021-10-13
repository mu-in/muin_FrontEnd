import React, { ReactElement, useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
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
	const { name, setName } = useContext(UserContext);
	const [userInfo, setUserInfo] = useState({});

	const signIn = async () => {
		GoogleSignin.configure({
			iosClientId: '690007679691-m12da57821qgo9dbp59ud9ssm9nf0kh9.apps.googleusercontent.com',
		});
		try {
			await GoogleSignin.hasPlayServices();
			const info = await GoogleSignin.signIn();
			setUserInfo(info);
			console.log(userInfo);
			navigation.navigate('QR');
		} catch (error) {
			//
		}
	};

	const login = () => {
		setName('무야호!');
		navigation.navigate('QR');
	};
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>login</Text>
				<Button onPress={login} title="login" />
				<Button onPress={signIn} title="google" />
			</View>
		</SafeAreaView>
	);
}

export default Login;
