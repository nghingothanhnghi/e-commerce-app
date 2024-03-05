import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { IconWorld } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language);

  const languageOptions = [
    { value: "vn", label: "VN" },
    { value: "en", label: "EN" },
    // Add more options as needed
  ];

  const handleSelect = (eventKey) => {
    const selectedOption = languageOptions.find((option) => option.value === eventKey);
    setSelected(selectedOption.value);
    localStorage.setItem("selectedLanguage", selectedOption.value);
    i18n.changeLanguage(selectedOption.value);
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      setSelected(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <>
      <Dropdown onSelect={handleSelect} defaultactivekey={selected} align="end">
        <Dropdown.Toggle variant="light" size="sm" className="px-3 no-caret rounded-pill">
          <IconWorld size={18} stroke={1}/> <span className="text-truncate">{languageOptions.find((option) => option.value === selected)?.label || "Select Language"}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {languageOptions.map((option) => (
            <Dropdown.Item key={option.value} eventKey={option.value}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default LanguageSwitch;
