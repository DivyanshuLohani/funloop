import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { initSocket } from "../services/socket";
import { User } from "../types";


export const AuthContext = createContext<{ user: User | null; token: string | null; loading: boolean; updateAuth: (token: string, user: User) => void } | null>(null);

export function AuthProvider({ children }: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        init();
    }, []);


    function updateAuth(token: string, user: User) {
        setToken(token);
        setUser(user);

        // Store in secure storage
        SecureStore.setItemAsync("token", token);
        SecureStore.setItemAsync("user", JSON.stringify(user));

        initSocket(token);
    }

    async function init() {
        const storedToken = await SecureStore.getItemAsync("token");
        const storedUser = await SecureStore.getItemAsync("user");

        if (storedToken && storedUser) {
            try {
                const socket = initSocket(storedToken);
                socket.on("connect", () => {
                    setToken(storedToken);
                    setLoading(false);
                    setUser(JSON.parse(storedUser));
                });
                return;
            } catch (e) {
                console.log(e);
            }
        }

    }

    // async function guestLogin() {
    //     const res = await loginAsGuest();

    //     if (!res) {
    //         throw new Error("Failed to create guest");
    //     }

    //     await SecureStore.setItemAsync("token", res.token);

    //     setToken(res.token);
    //     setUser(res.user);

    //     initSocket(res.token);

    //     setLoading(false);
    // }

    return (
        <AuthContext.Provider value={{ user, token, loading, updateAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
