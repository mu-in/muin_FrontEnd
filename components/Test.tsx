import React, { ReactElement } from 'react';
import { Text } from 'react-native';

interface Props {
	text: string;
}
const Test = ({ text }: Props): ReactElement => <Text>{text}</Text>;

export default Test;
