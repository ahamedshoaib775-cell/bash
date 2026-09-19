import React, { createContext, useContext, useState } from 'react';
import type { CursorContextType, CursorMode } from '../types';

const CursorContext = createContext<CursorContextType>({
  cursorText: '',
  cursorMode: 'default',
  setCursor: () => {},
  resetCursor: () => {},
});

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const setCursor = (mode: CursorMode, text: string = '') => {
    setCursorMode(mode);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorMode('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider value={{ cursorMode, cursorText, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
