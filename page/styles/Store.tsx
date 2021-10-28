/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},
	top: {
		position: 'absolute',
		top: 0,
		width: '100%',
	},
	top_l: {
		margin: 50,
		position: 'absolute',
		left: 0,
	},
	top_r: {
		margin: 30,
		position: 'absolute',
		right: 0,
	},
	box: {
		backgroundColor: '#F2F2F2',
		width: '100%',
		position: 'absolute',
		bottom: 0,
		height: '78%',
	},
	displacement: {
		width: 90,
		height: 90,
		backgroundColor: '#DAEBF5',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bold_blue: {
		color: '#0076BA',
		fontWeight: 'bold',
		fontSize: 15,
	},
	bold_black: {
		color: '#000000',
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 15,
	},
	center: {
		textAlign: 'center',
		fontSize: 15,
		marginTop: 150,
		lineHeight: 25,
		color: '#5E5E5E',
	},
	btn: {
		height: 80,
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
		marginBottom: 0,
	},
	btn_top: {
		margin: 15,
		marginLeft: 20,
		fontWeight: 'bold',
		fontSize: 15,
	},
	btn_bottom: {
		marginLeft: 20,
		color: '#5E5E5E',
	},
	btn_right: {
		position: 'absolute',
		right: 30,
		top: 25,
		color: '#298FFF',
		fontWeight: 'bold',
		fontSize: 20,
	},

	width100: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: '#f2f2f2',
	},

	info: {
		height: 150,
		borderRadius: 30,
		backgroundColor: '#ffffff',
		margin: 20,
	},

	info_top: {
		marginTop: 30,
		marginLeft: 30,
		fontWeight: 'bold',
		fontSize: 20,
	},
	info_mid: {
		marginTop: 15,
		marginLeft: 30,
		color: '#5E5E5E',
	},
	info_bot: {
		marginTop: 25,
		marginLeft: 30,
		color: '#298FFF',
	},

	product: {
		margin: 20,
		borderRadius: 30,
		backgroundColor: '#ffffff',
	},
	tbl: {
		margin: 25,
	},
	tbl_head: {
		height: 30,
		backgroundColor: '#f2f2f2',
	},
	tbl_head_text: {
		textAlign: 'center',
		fontWeight: 'bold',
	},
	tbl_row: {
		height: 30,
	},
	tbl_row_text: {
		textAlign: 'center',
		color: '#5E5E5E',
		fontSize: 12,
	},
});

export default styles;
