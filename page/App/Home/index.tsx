import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import QRCode from 'react-native-qrcode-svg';
import RNTotp from 'react-native-totp';

import TagBtn from '../../../components/TagBtn';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, 'QR'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	box: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		width: '80%',
		height: 400,
		backgroundColor: '#ffffff',
	},
	box_tr: {
		margin: 25,
		position: 'absolute',
		top: 0,
		left: 0,
		fontSize: 18,
		fontWeight: 'bold',
	},
	box_tl: {
		margin: 15,
		position: 'absolute',
		top: 0,
		right: 0,
	},
	box_b: {
		margin: 50,
		position: 'absolute',
		bottom: 0,
	},
	text: {
		margin: 10,
		color: '#5E5E5E',
		position: 'absolute',
		top: 30,
		fontSize: 18,
		textAlign: 'center',
	},
	qr: {
		backgroundColor: '#ffffff',
	},
	qr_btn: {
		color: '#FF644E',
		fontWeight: 'bold',
		fontSize: 20,
	},
});

const logo = require('../../../img/logo.png');

function Home({ navigation }: Props): ReactElement {
	const manager = false;
	const userName = '김세종';
	const [sec, setSec] = useState(0);
	const [token, setToken] = useState('-');

	const qrcode = () => {
		setSec(15);
		RNTotp.generateOTP(
			{
				base32String: '123',
				digits: 8,
				period: 15,
			},
			(code) => {
				setToken(code);
			}
		);
	};

	useEffect(() => {
		const countdown = setInterval(() => {
			if (sec > 0) setSec(sec - 1);
			if (sec === 0) clearInterval(countdown);
		}, 1000);
		return () => clearInterval(countdown);
	}, [sec]);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>{'이용하려는 무인매장에\nQR코드로 체크인하세요.'}</Text>
			<View style={styles.box}>
				<Text style={styles.box_tr}>{userName}님</Text>
				<View style={styles.box_tl}>
					{manager ? (
						<TagBtn
							title="매니저"
							checked
							onPress={() => Alert.alert('매니저 인증 완료', '매니저 인증이 완료된 사용자입니다.', [{ text: '확인' }])}
						/>
					) : (
						<TagBtn title="고객" onPress={() => navigation.navigate('매니저 인증')} />
					)}
				</View>
				<Text style={styles.box_b}>🕒 {sec} 초</Text>
				<View style={styles.qr}>
					{sec === 0 ? (
						<View>
							<TouchableOpacity onPress={qrcode}>
								<Text style={styles.qr_btn}>입장 QR 생성</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View>
							<QRCode value={token} logo={logo} logoSize={50} size={200} />
							<Text>{token}</Text>
						</View>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}

export default Home;
