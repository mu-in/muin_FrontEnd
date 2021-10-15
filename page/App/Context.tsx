/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactElement, useState } from 'react';

interface Props {
	children: JSX.Element;
}
const defaultValue = {
	name: '-',
	uuid: '-',
	jwt: '-',
	google: '-',
	manager: false,
	setName: (name: string) => {},
	setUuid: (uuid: string) => {},
	setJwt: (jwt: string) => {},
	setGoogle: (token: string) => {},
	setManager: (manager: boolean) => {},
};

export const UserContext = createContext(defaultValue);

export const UserContextProvider = (props: Props): ReactElement => {
	const { children } = props;
	const [initName, setInitName] = useState('-');
	const [initUuid, setInitUuid] = useState('A');
	const [initJwt, setInitJwt] = useState('-');
	const [initGoogle, setInitGoogle] = useState('-');
	const [initManager, setInitManager] = useState(false);

	const setNameHandler = (name: string) => setInitName(name);
	const setUuidHandler = (uuid: string) => setInitUuid(uuid);
	const setJwtHandler = (jwt: string) => setInitJwt(jwt);
	const setGoogleHandler = (google: string) => setInitGoogle(google);
	const setManagerHandler = (manager: boolean) => setInitManager(manager);

	return (
		<UserContext.Provider
			value={{
				name: initName,
				uuid: initUuid,
				jwt: initJwt,
				google: initGoogle,
				manager: initManager,
				setName: setNameHandler,
				setUuid: setUuidHandler,
				setJwt: setJwtHandler,
				setGoogle: setGoogleHandler,
				setManager: setManagerHandler,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
