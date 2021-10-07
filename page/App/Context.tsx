/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactElement, useState } from 'react';

interface Props {
	children: JSX.Element;
}
const defaultValue = {
	manager: false,
	setManager: (manager: boolean) => {},
};

export const UserContext = createContext(defaultValue);

const Context = (props: Props): ReactElement => {
	const { children } = props;
	const [initManager, setInitManager] = useState(false);

	const setInitUserHandler = (manager: boolean) => setInitManager(manager);

	return (
		<UserContext.Provider value={{ manager: initManager, setManager: setInitUserHandler }}>
			{children}
		</UserContext.Provider>
	);
};

export default Context;
