'use client';
import { ReactNode, useState, createContext, Dispatch, SetStateAction } from 'react';

interface StateType {
	loading: boolean,
	loggedIn: boolean
}

interface AuthStateType extends StateType {
	setAuthState: Dispatch<SetStateAction<StateType>>;
}

export const AuthContext = createContext<AuthStateType>({
	loading: true,
	loggedIn: false,
	setAuthState: () => {}
});

export default function AuthContextProvider({ children }: { children: ReactNode }) {
	const [authState, setAuthState] = useState<StateType>({
		loading: true,
		loggedIn: false
	});
	return (
		<AuthContext.Provider value={ { ...authState, setAuthState } }>
			{ children }
		</AuthContext.Provider>
	);
};