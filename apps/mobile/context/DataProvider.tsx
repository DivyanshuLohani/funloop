import { ServerData } from "@/types/settings";
import { createContext } from "react";


export const DataContext = createContext<ServerData | null>(null);

export const DataProvider = ({ children, initialData }: { children: React.ReactNode, initialData?: ServerData }) => {
    return (
        <DataContext.Provider value={initialData || null}>
            {children}
        </DataContext.Provider>
    );
};
