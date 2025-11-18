import React from 'react';

export interface IThemeContext {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export const ThemeContext = React.createContext<IThemeContext>({
  theme: 'light',
  setTheme: () => {},
});
