// src/context/MatchContext.tsx
import React, { createContext, useContext, useState } from "react";
import { PlayerSnapshot } from "@funloop/types";

type MatchContextType = {
    roomId: string | null;
    playersMap: Record<string, PlayerSnapshot> | null;
    setMatch: (data: {
        roomId: string;
        playersMap: Record<string, PlayerSnapshot>;
    }) => void;
    clearMatch: () => void;
};

const MatchContext = createContext<MatchContextType | null>(null);

export function MatchProvider({ children }: { children: React.ReactNode }) {
    const [roomId, setRoomId] = useState<string | null>(null);
    const [playersMap, setPlayersMap] =
        useState<Record<string, PlayerSnapshot> | null>(null);

    function setMatch(data: {
        roomId: string;
        playersMap: Record<string, PlayerSnapshot>;
    }) {
        setRoomId(data.roomId);
        setPlayersMap(data.playersMap);
    }

    function clearMatch() {
        setRoomId(null);
        setPlayersMap(null);
    }

    return (
        <MatchContext.Provider
            value={{ roomId, playersMap, setMatch, clearMatch }}
        >
            {children}
        </MatchContext.Provider>
    );
}

export function useMatch() {
    const ctx = useContext(MatchContext);
    if (!ctx) throw new Error("useMatch must be used inside MatchProvider");
    return ctx;
}
