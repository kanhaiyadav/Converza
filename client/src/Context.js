import React, { createContext, useState } from 'react';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <userContext.Provider value={{ userData, setUserData }}>
            {children}
        </userContext.Provider>
    );
};
