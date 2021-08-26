import React, { ReactElement, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import RNTotp from 'react-native-totp';

function QR(): ReactElement {
	const [token, setToken] = useState('');

	RNTotp.generateOTP(
		{
			base32String: 'a225f3b3-6ba2-4da1-b14a-1bb691cabf79',
			digits: 16,
			period: 30,
		},
		(code) => {
			setToken(code);
		}
	);

	return <QRCode value={token} />;
}

export default QR;
