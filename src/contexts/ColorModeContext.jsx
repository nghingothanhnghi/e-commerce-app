import React, { createContext, useContext } from 'react';
import useColorModeToggler from '../hooks/useColorModeToggler';

const ColorModeContext = createContext();

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

export const ColorModeProvider = ({ children }) => {
  const { handleToggleClick } = useColorModeToggler();

  const toggleColorMode = (theme) => {
    handleToggleClick(theme);
  };

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
