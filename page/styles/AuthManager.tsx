import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},

	box: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 50,
		marginTop: 30,
		borderBottomWidth: 1,
		borderColor: '#D5D5D5',
	},

	box2: {
		position: 'absolute',
		justifyContent: 'flex-start',
		margin: 50,
		top: 210,
	},

	keyword: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},

	input: {
		color: '#298FFF',
	},

	btn: {
		position: 'absolute',
		bottom: 200,
		left: 50,
		right: 50,
	},

	btn2: {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: 200,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},

	text: {
		marginBottom: 20,
		textAlign: 'left',
		width: '100%',
		fontSize: 18,
		color: '#5E5E5E',
	},

	bold: {
		marginTop: 30,
		textAlign: 'left',
		width: '100%',
		fontWeight: 'bold',
		fontSize: 18,
	},
});

export default styles;
