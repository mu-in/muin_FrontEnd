/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable func-names */

import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button, TextInput, Alert } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Title from '../../../components/Title';
import TagBtn from '../../../components/TagBtn';

interface Props {
	navigation: NativeStackNavigationProp<ParamListBase, '매니저 인증'>;
}

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

const answers = {
	serial: '',
	store: '',
	address: '',
	keyword: '',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AuthManager({ navigation }: Props): ReactElement {
	const [answer, setAnswer] = useState('');
	const [page, setPage] = useState(0);

	const [key1, setKey1] = useState(false); // icecream
	const [key2, setKey2] = useState(false); // snack
	const [key3, setKey3] = useState(false); // drink
	const [key4, setKey4] = useState(false); // ramen
	const [key5, setKey5] = useState(false); // disposable

	const questions = [
		'스마트 POS 뒷편에 있는\n시리얼 넘버를 작성해주세요.',
		'매장 명을 작성해주세요. \n ',
		'매장 주소를 작성해주세요.\n ',
		'매장 상품 키워드를 선택해주세요.\n ',
		answers.store,
	];

	const nextPage = () => {
		// exception
		if (page !== 3 && answer === '') {
			Alert.alert('경고', '문자를 입력하세요.', [{ text: '확인' }]);
			return;
		}
		if (page === 3) {
			let str = '';

			if (key1 === true) str += `, 아이스크림`;
			if (key2 === true) str += ', 과자';
			if (key3 === true) str += ', 음료수';
			if (key4 === true) str += ', 라면';
			if (key5 === true) str += ', 일회용품';

			setAnswer(str);
		}

		if (page === 0) {
			answers.serial = answer;
		} else if (page === 1) {
			answers.store = answer;
		} else if (page === 2) {
			answers.address = answer;
		} else if (page === 3) {
			answers.keyword = answer;
		}

		setPage(page + 1);
		setAnswer('');
	};

	const finish = () => {
		Alert.alert('완료', '매니저 인증이 완료되었습니다.', [{ text: '확인', onPress: () => navigation.navigate('QR') }]);
	};

	useEffect(() => {
		// console.log(page);
	}, [page]);

	return (
		<SafeAreaView style={styles.container}>
			<Title>{questions[page]}</Title>
			{(function () {
				// 시리얼 넘버
				if (page === 0) {
					return (
						<View style={styles.box}>
							<TextInput
								style={styles.input}
								onChangeText={setAnswer}
								value={answer}
								placeholder="abcde-fghijk-lmnop"
							/>
						</View>
					);
				}
				// 매장 이름
				if (page === 1) {
					return (
						<View style={styles.box}>
							<TextInput style={styles.input} onChangeText={setAnswer} value={answer} placeholder="세종대마트" />
						</View>
					);
				}
				// 매장 주소
				if (page === 2) {
					return (
						<View style={styles.box}>
							<TextInput
								style={styles.input}
								onChangeText={setAnswer}
								value={answer}
								placeholder="서울특별시 광진구 군자로 98"
							/>
						</View>
					);
				}
				// 키워드
				if (page === 3) {
					return (
						<View style={styles.box2}>
							<View style={styles.keyword}>
								<TagBtn title="아이스크림" checked={key1} onPress={() => setKey1(!key1)} />
								<TagBtn title="과자" checked={key2} onPress={() => setKey2(!key2)} />
								<TagBtn title="음료수" checked={key3} onPress={() => setKey3(!key3)} />
								<TagBtn title="라면" checked={key4} onPress={() => setKey4(!key4)} />
								<TagBtn title="일회용품" checked={key5} onPress={() => setKey5(!key5)} />
							</View>
						</View>
					);
				}
				// 최종
				if (page === 4) {
					return (
						<View style={styles.box2}>
							<Text style={styles.text}>{answers.address}</Text>
							<View style={styles.keyword}>
								{key1 === true ? <TagBtn title="아이스크림" checked /> : null}
								{key2 === true ? <TagBtn title="과자" checked /> : null}
								{key3 === true ? <TagBtn title="음료수" checked /> : null}
								{key4 === true ? <TagBtn title="라면" checked /> : null}
								{key5 === true ? <TagBtn title="일회용품" checked /> : null}
							</View>
							<Text style={styles.bold}>해당 정보로 매장을 추가합니다.</Text>
						</View>
					);
				}
			})()}

			{page !== 4 ? (
				<View style={styles.btn}>
					<Button title="다음" onPress={() => nextPage()} />
				</View>
			) : (
				<View style={styles.btn2}>
					<Button color="#EE220C" title="취소" onPress={() => navigation.goBack()} />
					<Button title="확인" onPress={() => finish()} />
				</View>
			)}
		</SafeAreaView>
	);
}

export default AuthManager;
