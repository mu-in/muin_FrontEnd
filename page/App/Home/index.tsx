/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, Alert, TouchableOpacity } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import QRCode from 'react-native-qrcode-svg';
// import TOTP from 'totp-generator';

import { UserContext, ServerContext } from '../Context';
import TagBtn from '../../../components/TagBtn';
import styles from '../../styles/Home';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, 'QR'>;
}

const logo = require('../../../img/logo.png');

function Home({ navigation }: Props): ReactElement {
	const { name, manager, uuid, jwt } = useContext(UserContext);
	const { url } = useContext(ServerContext);
	const [sec, setSec] = useState(0);
	const [qr, setQR] = useState('-');

	/*
	// totp
	const [totp, setTotp] = useState(
		TOTP(uuid, {
			digits: 8,
			algorithm: 'SHA-256',
			period: 15,
			timestamp: 1234567891010,
		})
	);

	const qrcode = () => {
		setSec(15);
		setTotp(
			TOTP(uuid, {
				digits: 8,
				algorithm: 'SHA-256',
				period: 15,
				timestamp: 1234567891010,
			})
		);
	};
	*/

	const qrcode = async () => {
		// const res = await fetch(`${url}/user/qrcode?seed=${Date.now()}:${uuid}`, {
		//	method: 'GET',
		//	headers: { Authorization: `Bearer ${jwt}` },
		// });

		// const data = await res.json();
		// console.log(data);

		setQR(`${Date.now}:${uuid}`);
		setSec(30);
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
				{name !== '-' ? (
					<>
						<Text style={styles.box_tr}>{name}님</Text>
						<View style={styles.box_tl}>
							{manager ? (
								<TagBtn
									title="매니저"
									checked
									onPress={() =>
										Alert.alert('매니저 인증 완료', '매니저 인증이 완료된 사용자입니다.', [{ text: '확인' }])
									}
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
									<QRCode value={qr.toString()} logo={logo} logoSize={50} size={200} />
									{/* <Text>{qr}</Text> */}
								</View>
							)}
						</View>
					</>
				) : (
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={styles.qr_btn}>로그인 후 이용가능</Text>
					</TouchableOpacity>
				)}
			</View>
		</SafeAreaView>
	);
}

export default Home;
