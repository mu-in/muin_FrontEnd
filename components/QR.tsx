import React, { ReactElement, useState, useEffect } from 'react';
import { Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import RNTotp from 'react-native-totp';

function QR(): ReactElement {
	const [token, setToken] = useState('-');

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const generate = setInterval(() => {
			RNTotp.generateOTP(
				{
					base32String: '123',
					digits: 8,
					period: 10,
				},
				(code) => {
					setToken(code);
				}
			);
		}, 5000);
	}, [token]);

	return (
		<>
			<QRCode value={token} />
			<Text>{token}</Text>
		</>
	);
}

export default QR;
