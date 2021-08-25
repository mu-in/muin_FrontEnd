import React, { ReactElement, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { View, Text, Button } from 'react-native';

function GeoLocation(): ReactElement {
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

	const location = () => {
		Geolocation.getCurrentPosition(
			(position) => {
				const lati = JSON.stringify(position.coords.latitude);
				const longi = JSON.stringify(position.coords.longitude);

				setLatitude(lati);
				setLongitude(longi);
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		);
	};

	return (
		<View>
			<Button title="get geolocation" onPress={() => location()} />
			<Text>latitude: {latitude}</Text>
			<Text>longitude: {longitude}</Text>
		</View>
	);
}

export default GeoLocation;
