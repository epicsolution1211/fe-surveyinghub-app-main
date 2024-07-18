import React, { ReactNode, useEffect, useState } from 'react';
import { AuthProvider as ComponentAuthProvider, AuthContextInterface } from '@surveying-hub-bv/fe-component-library';
import { useFirebaseApp } from './firebase';
import { User } from 'firebase/auth';
import { AdminService } from './services/AdminService';

export interface ExtendedAuthContextInterface extends AuthContextInterface {
    uid: string;
    getToken: () => Promise<string>;
}
export type ExtendedAuthContext = ExtendedAuthContextInterface | 'loading' | undefined;
export type NonLoadingExtendedAuthContext = ExtendedAuthContextInterface | undefined;
export const nonLoading = (isLoggedIn: ExtendedAuthContextInterface | 'loading' | undefined): NonLoadingExtendedAuthContext => (isLoggedIn === 'loading') ? undefined : isLoggedIn
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }: any) => {
    const { isLoggedIn, logout } = useAuth();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const fetchIsAdmin = async () => {
            if (isLoggedIn && isLoggedIn !== 'loading') {
                try {
                    const token = await isLoggedIn.getIdToken();
                    await AdminService.isAdmin(token);
                    setIsAdmin(true);
                } catch (error) {
                    setIsAdmin(false);
                    console.error('Failed to fetch isAdmin status', error);
                }
            }
        };

        fetchIsAdmin();
    }, [isLoggedIn]);


    const contextValue: ExtendedAuthContextInterface | 'loading' | undefined = (() => {
        if (isLoggedIn === 'loading') return 'loading'
        else if (isLoggedIn === undefined) return undefined
        else
            return ({
                username: isLoggedIn.displayName || "",
                email: isLoggedIn.email || undefined,
                photoURL: isLoggedIn.photoURL || undefined,
                uid: isLoggedIn.uid,
                isAdmin,
                getToken: async () => await isLoggedIn.getIdToken(),
                logout
            })
    })();

    return (
        <ComponentAuthProvider value={contextValue}>
            {children}
        </ComponentAuthProvider>
    );
};

export default AuthProvider;

export function useAuth() {
    const auth = useFirebaseApp()
    const [isLoggedIn, setIsLoggedIn] = useState<User | 'loading' | undefined>('loading');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(user);
            } else {
                setIsLoggedIn(undefined);
            }
        });
        return () => unsubscribe();
    }, [auth]);

    const logout = async () => {
        await auth.signOut();
    };
    return { isLoggedIn, logout };
}
