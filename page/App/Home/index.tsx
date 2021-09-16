import React, { ReactElement } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import QR from '../../../components/QR';
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
});

const manager = false;

function Home({ navigation }: Props): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				{manager ? (
					<TagBtn title="매니저" checked />
				) : (
					<TagBtn title="고객" onPress={() => navigation.navigate('매니저 인증')} />
				)}
			</View>
			<View>
				<QR />
			</View>
		</SafeAreaView>
	);
}

export default Home;
