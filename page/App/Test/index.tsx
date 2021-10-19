import React, { ReactElement } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, 'Test'>;
}

interface Props2 {
	navigation: NativeStackNavigationProp<ParamListBase, '홈'>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function storeList({ navigation }: Props): ReactElement {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>Test</Text>
				<Button title="세종마트" onPress={() => navigation.navigate('세종마트', { storeName: '세종마트' })} />
			</View>
		</SafeAreaView>
	);
}

const Test2Stack = createNativeStackNavigator();
function store(storeName: string): ReactElement {
	const sname = storeName.route.params.storeName;

	function Test2page(): ReactElement {
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<Text>{sname} 매출현황</Text>
				</View>
			</SafeAreaView>
		);
	}

	function Test2PageHome({ navigation }: Props2): ReactElement {
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<Text>{sname} 홈</Text>
					<Button title="매출" onPress={() => navigation.navigate('매출현황', { storeName: '매출현황' })} />
				</View>
			</SafeAreaView>
		);
	}

	return (
		<Test2Stack.Navigator>
			<Test2Stack.Screen name="홈" component={Test2PageHome} />
			<Test2Stack.Screen name="매출현황" component={Test2page} />
		</Test2Stack.Navigator>
	);
}

const TestStack = createNativeStackNavigator();
function TestStackScreen(): ReactElement {
	return (
		<TestStack.Navigator>
			<TestStack.Screen name="Test" component={storeList} />
			<TestStack.Screen name="세종마트" component={store} />
		</TestStack.Navigator>
	);
}

export default TestStackScreen;
