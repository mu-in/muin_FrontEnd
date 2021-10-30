import { StyleSheet } from 'react-native';

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

export default styles;
