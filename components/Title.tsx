import React, { ReactElement } from 'react';
import { Text, StyleSheet } from 'react-native';

interface props {
	children: string;
}

const styles = StyleSheet.create({
	text: {
		color: '#000000',
		textAlign: 'left',
		margin: 50,
		marginTop: 200,
		fontSize: 20,
		fontWeight: 'bold',
		lineHeight: 30,
	},
});

function Title(Prop: props): ReactElement {
	const { children } = Prop;

	return <Text style={styles.text}>{children}</Text>;
}

export default Title;
