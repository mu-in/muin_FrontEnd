import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import SelectDropdown from 'react-native-select-dropdown';

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

const App = () => {
	const onButtonPress = () => {
		Alert.prompt(
			'Enter password',
			'Enter your password to claim your $1.5B in lottery winnings',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: (num) => console.log(`OK Pressed, password: ${num}`),
				},
			],
			'plain-text'
		);
	};

	const [modalVisible, setModalVisible] = useState(false);
	const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Hello World!</Text>
						<Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.textStyle}>Hide Modal</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
				<Text style={styles.textStyle}>Show Modal</Text>
			</Pressable>
			<InputSpinner
				max={9999}
				min={0}
				step={1}
				value={1234}
				color="#000000"
				onChange={(num) => {
					console.log(num);
				}}
			/>

			<SelectDropdown
				data={countries}
				onSelect={(selectedItem, index) => {
					console.log(selectedItem, index);
				}}
				buttonTextAfterSelection={(selectedItem, index) => {
					// text represented after item is selected
					// if data array is an array of objects then return selectedItem.property to render after item is selected
					return selectedItem;
				}}
				rowTextForSelection={(item, index) => {
					// text represented for each item in dropdown
					// if data array is an array of objects then return item.property to represent item in dropdown
					return item;
				}}
			/>
		</View>
	);
};

export default App;
