import { createContext, useState } from 'react';

const NameContext = createContext();

const NameProvider = ({ children }) => {
  const [name, setName] = useState(null);

  const updateName = (newName) => {
    setName(newName);
  };

  return (
    <NameContext.Provider value={{ name, updateName }}>
      {children}
    </NameContext.Provider>
  );
};

export { NameContext, NameProvider };