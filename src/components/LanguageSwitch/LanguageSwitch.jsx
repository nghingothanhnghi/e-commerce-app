import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { IconWorld } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(localStorage.getItem("selectedLanguage") || getDefaultLanguage());

  const languageOptions = [
    { value: "en", label: "EN" },
    { value: "vn", label: "VN" },
    // Add more options as needed
  ];

  function getDefaultLanguage() {
    // Set your logic to determine the default language here
    // For example, you can use the browser's language or any other preference
    return "vn";
  }

  const handleSelect = (eventKey) => {
    const selectedOption = languageOptions.find((option) => option.value === eventKey);
    setSelected(selectedOption.value);
    localStorage.setItem("selectedLanguage", selectedOption.value);
    i18n.changeLanguage(selectedOption.value);
  };

  useEffect(() => {
    i18n.changeLanguage(selected);
  }, [selected, i18n]);

  return (
    <>
      <Dropdown onSelect={handleSelect} defaultactivekey={i18n.language || selected} align="end">
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
