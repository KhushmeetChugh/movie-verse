import { createContext, useContext, useState } from "react";

// Step 2: Define the context
const UserContext = createContext();

// Step 3: Define the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    // Use the created context provider
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Step 4: Export the context and a custom hook to use the context
export const useUser = () => useContext(UserContext);
export default UserContext;
