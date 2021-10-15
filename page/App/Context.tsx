/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactElement, useState } from 'react';

interface Props {
	children: JSX.Element;
}
const defaultValue = {
	name: '-',
	token: '-',
	manager: false,
	setName: (name: string) => {},
	setToken: (token: string) => {},
	setManager: (manager: boolean) => {},
};

export const UserContext = createContext(defaultValue);

export const UserContextProvider = (props: Props): ReactElement => {
	const { children } = props;
	const [initName, setInitName] = useState('-');
	const [initToken, setInitToken] = useState('-');
	const [initManager, setInitManager] = useState(false);

	const setNameHandler = (name: string) => setInitName(name);
	const setTokenHandler = (token: string) => setInitToken(token);
	const setManagerHandler = (manager: boolean) => setInitManager(manager);

	return (
		<UserContext.Provider
			value={{
				name: initName,
				token: initToken,
				manager: initManager,
				setName: setNameHandler,
				setToken: setTokenHandler,
				setManager: setManagerHandler,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
