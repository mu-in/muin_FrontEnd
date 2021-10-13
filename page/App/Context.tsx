/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactElement, useState } from 'react';

interface Props {
	children: JSX.Element;
}
const defaultValue = {
	name: '-',
	manager: false,
	setName: (name: string) => {},
	setManager: (manager: boolean) => {},
};

export const UserContext = createContext(defaultValue);

export const UserContextProvider = (props: Props): ReactElement => {
	const { children } = props;
	const [initManager, setInitManager] = useState(false);
	const [initName, setInitName] = useState('-');

	const setManagerHandler = (manager: boolean) => setInitManager(manager);
	const setNameHandler = (name: string) => setInitName(name);

	return (
		<UserContext.Provider
			value={{ name: initName, manager: initManager, setName: setNameHandler, setManager: setManagerHandler }}
		>
			{children}
		</UserContext.Provider>
	);
};
