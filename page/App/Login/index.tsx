import React, { ReactElement, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserContext } from '../Context';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, 'Login'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function Login({ navigation }: Props): ReactElement {
    const { name, setName } = useContext(UserContext) 
	
    const login = () => {
        setName('무야호!');
        navigation.navigate('QR');
    }
    return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>login</Text>
                <Button onPress={login} title='login'/>
			</View>
		</SafeAreaView>
	);
}

export default Login;
