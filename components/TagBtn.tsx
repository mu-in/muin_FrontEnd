import React, { ReactElement } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface props {
	title: string;
	checked?: boolean;
	onPress?: () => void;
}

const styles = StyleSheet.create({
	check: {
		backgroundColor: '#298FFF',
		borderWidth: 1,
		borderColor: '#298FFF',
		borderRadius: 10,
		overflow: 'hidden',
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		margin: 5,
		color: '#ffffff',
		fontSize: 15,
		fontWeight: 'bold',
	},

	uncheck: {
		backgroundColor: '#D5D5D5',
		borderWidth: 1,
		borderColor: '#D5D5D5',
		borderRadius: 10,
		overflow: 'hidden',
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		margin: 5,
		color: '#5E5E5E',
		fontSize: 15,
		fontWeight: 'bold',
	},
});

function TagBtn(Prop: props): ReactElement {
	const { title, checked, onPress } = Prop;

	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={checked === true ? styles.check : styles.uncheck}>{title}</Text>
		</TouchableOpacity>
	);
}

export default TagBtn;
