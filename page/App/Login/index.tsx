import React, { ReactElement, useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
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
		backgroundColor: '#ffffff',
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 100,
	},
	welcome: {
		marginBottom: 200,
	},
	text: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		lineHeight: 40,
	},
	btn: {
		backgroundColor: '#298FFF',
		borderWidth: 1,
		borderColor: '#298FFF',
		borderRadius: 10,
		overflow: 'hidden',
		padding: 8,
		paddingLeft: 25,
		paddingRight: 25,
		color: '#ffffff',
		fontSize: 25,
		fontWeight: 'bold',
	},
});

const logo = require('../../../img/logo.png');

function Login({ navigation }: Props): ReactElement {
	const { name, setName, setGoogle } = useContext(UserContext);
	const [login, setLogin] = useState(false);

	const signIn = async () => {
		GoogleSignin.configure({
			iosClientId: '690007679691-m12da57821qgo9dbp59ud9ssm9nf0kh9.apps.googleusercontent.com',
		});
		try {
			await GoogleSignin.hasPlayServices();
			const info = await GoogleSignin.signIn();

			if (info.user.name != null) setName(info.user.name);
			if (info.idToken != null) setGoogle(info.idToken);

			setLogin(true);
		} catch (error) {
			Alert.alert('로그인 실패', '구글 로그인에 실패했습니다.', [{ text: '확인' }]);
		}
	};

	const welcome = () => {
		navigation.navigate('QR');
	};

	return (
		<SafeAreaView style={styles.container}>
			{login ? (
				<>
					<View style={styles.welcome}>
						<Text style={styles.text}>{`안녕하세요\n${name}님`}</Text>
					</View>
					<TouchableOpacity onPress={welcome}>
						<Text style={styles.btn}>시작하기</Text>
					</TouchableOpacity>
				</>
			) : (
				<>
					<View>
						<Image source={logo} style={styles.logo} />
					</View>
					<GoogleSigninButton onPress={signIn} size={GoogleSigninButton.Size.Standard} />
				</>
			)}
		</SafeAreaView>
	);
}

export default Login;
