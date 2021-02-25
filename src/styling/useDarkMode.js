//Custom Darkmode hook for toggler.

import { useEffect, useState } from 'react';

export const getMode = () => {
    const getTheme = window.localStorage.getItem('theme');
    if (getTheme !== null) {
        return getTheme;
    } else {
        return 'dark';
    }
};

export const useDarkMode = () => {
    //Using dark mode as initial mode due to more completeness. When program is nearing final stages, we will use 'light' mode for default again.
    const [theme, setTheme] = useState('dark');
    const [componentMounted, setComponentMounted] = useState(false);

    const setMode = (mode) => {
        window.localStorage.setItem('theme', mode);
        setTheme(mode);
    };

    const toggleTheme = (callBack) => {
        if (theme === 'light') {
            setMode('dark');
            return callBack('dark');
        } else {
            setMode('light');
            return callBack('light');
        }
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');

        if (localTheme) {
            setTheme(localTheme);
        } else {
            setMode('dark');
        }

        setComponentMounted(true);
    }, []);

    return [theme, toggleTheme, componentMounted];
};
