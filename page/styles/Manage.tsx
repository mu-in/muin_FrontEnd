import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	box: {
		backgroundColor: '#F2F2F2',
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	btn: {
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
		marginBottom: 0,
		height: 80,
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
	btn_right_bold: {
		position: 'absolute',
		right: 30,
		top: 23,
		color: '#298FFF',
		fontWeight: 'bold',
		fontSize: 25,
	},
	btn_right_text: {
		fontSize: 15,
		color: '#5E5E5E',
	},
	create_center: {
		textAlign: 'center',
		marginTop: 20,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#ffffff',
	},
	create_center_s: {
		textAlign: 'center',
		marginTop: 18,
		fontWeight: 'bold',
		fontSize: 18,
		color: '#ffffff',
	},
	create_center_black_s: {
		textAlign: 'center',
		marginTop: 18,
		fontWeight: 'bold',
		fontSize: 18,
		color: '#000000',
	},
	sales: {
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
	},
	border_t: {
		margin: 20,
		marginBottom: 0,
		fontWeight: 'bold',
		fontSize: 18,
	},
	border_tr: {
		position: 'absolute',
		right: 30,
		top: 15,
		color: '#298FFF',
		fontWeight: 'bold',
		fontSize: 20,
	},
	tbl: {
		margin: 20,
	},
	tbl_row: {
		height: 25,
		textAlign: 'center',
	},
	tbl_text: {
		color: '#5E5E5E',
		fontSize: 10,
	},
	real: {
		margin: 20,
		marginTop: 0,
	},
	real_l: {
		position: 'absolute',
		top: 0,
		left: 0,
		borderRadius: 18,
		backgroundColor: '#ffffff',
		width: '48%',
	},
	real_r: {
		position: 'absolute',
		top: 0,
		right: 0,
		borderRadius: 18,
		backgroundColor: '#ffffff',
		width: '48%',
	},
	real_pay: {
		margin: 20,
		textAlign: 'center',
		color: '#5E5E5E',
		fontSize: 23,
	},
	statics: {
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
		marginTop: 110,
		height: 300,
	},
	graph: {
		marginTop: 20,
	},
	stock: {
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
		marginTop: 0,
		height: 120,
	},
	stock_tag: {
		margin: 20,
	},
	stock_l: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '48%',
	},
	stock_r: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: '48%',
	},
	tag_text: {
		position: 'absolute',
		top: 5,
		left: 75,
		color: '#5E5E5E',
		fontSize: 15,
	},
	tag_red: {
		backgroundColor: '#ED220D',
		borderWidth: 1,
		borderColor: '#ED220D',
		borderRadius: 10,
		overflow: 'hidden',
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		margin: 5,
		color: '#ffffff',
		fontSize: 15,
		fontWeight: 'bold',
		width: 60,
	},
	tag_yellow: {
		backgroundColor: '#FEAE00',
		borderWidth: 1,
		borderColor: '#FEAE00',
		borderRadius: 10,
		overflow: 'hidden',
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		margin: 5,
		color: '#ffffff',
		fontSize: 15,
		fontWeight: 'bold',
		width: 60,
	},
	tag_blue: {
		position: 'absolute',
		left: 20,
		top: 20,
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
	red: {
		fontWeight: 'bold',
		color: '#ED220D',
		fontSize: 20,
	},
	yellow: {
		fontWeight: 'bold',
		color: '#FEAE00',
		fontSize: 20,
	},
	allSales: {
		borderRadius: 20,
		backgroundColor: '#ffffff',
		margin: 20,
		height: '100%',
	},
	tbl_pay: {
		marginLeft: 30,
		marginRight: 20,
	},
	margin_t: {
		marginTop: 20,
	},
	modal: {
		borderRadius: 20,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
		height: '75%',
		margin: 10,
		marginTop: 105,
	},
	btn_tr: {
		position: 'absolute',
		width: '35%',
		right: 0,
		bottom: 20,
		borderRadius: 18,
		backgroundColor: '#298FFF',
		margin: 20,
		marginBottom: 0,
		height: 55,
	},
	btn_tl: {
		position: 'absolute',
		width: '50%',
		left: 0,
		bottom: 20,
		borderRadius: 18,
		backgroundColor: '#ffffff',
		margin: 20,
		marginBottom: 0,
		height: 55,
	},
	hr: {
		borderBottomColor: '#D5D5D5',
		borderBottomWidth: 1,
	},
	bottom: {
		position: 'relative',
		padding: 20,
		width: '100%',
	},
	create_btn: {
		position: 'absolute',
		width: '100%',
		bottom: 20,
		borderRadius: 18,
		backgroundColor: '#298FFF',
		margin: 20,
		marginBottom: 0,
		height: 55,
	},
});

export default styles;