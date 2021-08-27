import React, { ReactElement, useState, useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg';
import RNTotp from 'react-native-totp';

function QR(): ReactElement {
	const [token, setToken] = useState('-');

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const generate = setInterval(() => {
			RNTotp.generateOTP(
				{
					base32String: 'a225f3b3-6ba2-4da1-b14a-1bb691cabf79',
					digits: 8,
					period: 5,
				},
				(code) => {
					setToken(code);
				}
			);
		}, 5000);
	}, [token]);

	return <QRCode value={token} />;
}

export default QR;
