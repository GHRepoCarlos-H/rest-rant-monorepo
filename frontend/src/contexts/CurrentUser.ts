import React, { createContext, useEffect, useState } from "react";

interface User {
    // Define the structure of the user object
    // Adjust these properties as per your actual user object
    id: string;
    name: string;
    email: string;
    // Add more properties if needed
}

interface CurrentUserContextType {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const CurrentUser = createContext<CurrentUserContextType>({
    currentUser: null,
    setCurrentUser: () => {}
});

interface CurrentUserProviderProps {
    children: React.ReactNode;
}

function CurrentUserProvider({ children }: CurrentUserProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/authentication/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    // Handle error responses
                    throw new Error('Failed to fetch user profile');
                }
                const user: User = await response.json();
                setCurrentUser(user);
            } catch (error) {
                // Handle errors
                console.error('Error fetching user profile:', error);
            }
        };

        getLoggedInUser();
    }, []);

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
}

export default CurrentUserProvider;
