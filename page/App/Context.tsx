/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactElement, useState } from 'react';
import { SERVER_URL } from './key';

interface Props {
	children: JSX.Element;
}
const userDefaultValue = {
	name: '-',
	email: '-',
	uuid: '-',
	jwt: '-',
	google: '-',
	manager: false,
	setName: (name: string) => {},
	setEmail: (email: string) => {},
	setUuid: (uuid: string) => {},
	setJwt: (jwt: string) => {},
	setGoogle: (google: string) => {},
	setManager: (manager: boolean) => {},
};

export const UserContext = createContext(userDefaultValue);

export const UserContextProvider = (props: Props): ReactElement => {
	const { children } = props;
	const [initName, setInitName] = useState('-');
	const [initEmail, setInitEmail] = useState('-');
	const [initUuid, setInitUuid] = useState('A');
	const [initJwt, setInitJwt] = useState('-');
	const [initGoogle, setInitGoogle] = useState('-');
	const [initManager, setInitManager] = useState(false);

	const setNameHandler = (name: string) => setInitName(name);
	const setEmailHandler = (email: string) => setInitEmail(email);
	const setUuidHandler = (uuid: string) => setInitUuid(uuid);
	const setJwtHandler = (jwt: string) => setInitJwt(jwt);
	const setGoogleHandler = (google: string) => setInitGoogle(google);
	const setManagerHandler = (manager: boolean) => setInitManager(manager);

	return (
		<UserContext.Provider
			value={{
				name: initName,
				email: initEmail,
				uuid: initUuid,
				jwt: initJwt,
				google: initGoogle,
				manager: initManager,
				setName: setNameHandler,
				setEmail: setEmailHandler,
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

const serverDefaultValue = {
	url: SERVER_URL,
};

export const ServerContext = createContext(serverDefaultValue);
