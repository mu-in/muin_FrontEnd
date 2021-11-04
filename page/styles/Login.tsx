import { StyleSheet } from 'react-native';

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

export default styles;
