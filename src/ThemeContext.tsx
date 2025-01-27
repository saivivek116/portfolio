'use client';
import { createContext, useEffect, useState } from "react";


export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedtheme = localStorage.getItem('theme') || 'light';
        setTheme(savedtheme as 'light' | 'dark');
        document.documentElement.classList.toggle('dark', savedtheme === 'dark');
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

