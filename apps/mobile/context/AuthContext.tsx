import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import DeviceInfo from "react-native-device-info";
import { initSocket } from "../services/socket";
import { User } from "../types";
import { api } from "../services/api";


export const AuthContext = createContext<{ user: User | null; token: string | null; loading: boolean } | null>(null);

export function AuthProvider({ children }: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function init() {
        const storedToken = await SecureStore.getItemAsync("token");

        if (storedToken) {
            try {
                const socket = initSocket(storedToken);
                socket.on("connect", () => {
                    setToken(storedToken);
                    setLoading(false);
                });
                return;
            } catch { }
        }

        // If no valid token, create guest
        await guestLogin();
    }

    async function guestLogin() {
        const deviceId = DeviceInfo.getUniqueId();

        const res = await api.post("/auth/guest", { deviceId });

        await SecureStore.setItemAsync("token", res.data.token);

        setToken(res.data.token);
        setUser(res.data.user);

        initSocket(res.data.token);

        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{ user, token, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
