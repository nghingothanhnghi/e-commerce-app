import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useColorMode } from "../../contexts/ColorModeContext";

const ThemeSwitch = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const [isDarkMode, setIsDarkMode] = useState(colorMode === 'dark');

    const handleToggleClick = () => {
        // Toggle the state and update the color mode
        setIsDarkMode(!isDarkMode);
        toggleColorMode(isDarkMode ? 'light' : 'dark');
    };

    return (
        <Button
            onClick={handleToggleClick}
            variant={isDarkMode ? "dark" : "light"}
            size="sm"
            className="theme-switch-button btn-circle"
        >
            {isDarkMode ? <IconSun size={18} /> : <IconMoon size={18} />}
        </Button>
    );
};

export default ThemeSwitch;
