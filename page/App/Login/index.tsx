import React, { ReactElement, useContext } from 'react';
import { SafeAreaView, View, StyleSheet, Alert, Image } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { UserContext, ServerContext } from '../Context';

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
	const { setName, setEmail, setGoogle, setJwt, setUuid } = useContext(UserContext);
	const { url } = useContext(ServerContext);

	const postServer = async ({ name, email, id }: { name: string | null; email: string; id: string | null }) => {
		console.log(JSON.stringify({ name, email, id_token: id }));
		const res = await fetch(`${url}/user/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, id_token: id }),
		});

		const data = await res.json();
		console.log(data);

		setUuid(data.uuid);
		setJwt(data.jwt);

		navigation.navigate('QR');
	};

	const signIn = async () => {
		GoogleSignin.configure({
			iosClientId: '690007679691-m12da57821qgo9dbp59ud9ssm9nf0kh9.apps.googleusercontent.com',
		});
		try {
			await GoogleSignin.hasPlayServices();
			const info = await GoogleSignin.signIn();

			if (info.user.name != null) setName(info.user.name);
			if (info.idToken != null) setGoogle(info.idToken);
			if (info.user.email != null) setEmail(info.user.email);

			const data = {
				name: info.user.name,
				email: info.user.email,
				id: info.user.id,
			};
			postServer(data);
		} catch (error) {
			Alert.alert('로그인 실패', '구글 로그인에 실패했습니다.', [{ text: '확인' }]);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Image source={logo} style={styles.logo} />
			</View>
			<GoogleSigninButton onPress={signIn} size={GoogleSigninButton.Size.Standard} />
		</SafeAreaView>
	);
}

export default Login;
