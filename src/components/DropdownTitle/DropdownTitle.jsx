import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconCalendarSearch } from '@tabler/icons-react';

const dropdownTypes = {
  default: {
    icon: "",
  },
  calendar: {
    icon: <IconCalendarSearch size={16} className="me-2" />,
  },
}

const DropdownTitle = ({ title, links, defaultSelected, type = 'default' }) => {


  const { icon } = dropdownTypes[type];

  console.log('Type:', type); 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultSelected );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    toggleDropdown();
  };

  useEffect(() => {
    setSelectedItem(defaultSelected);
  }, [defaultSelected]);

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="btn dropdown-toggle btn-outline-dark">
        {icon}
        {selectedItem ? selectedItem.label : title}
      </button>
      {isOpen && (
        <ul className="dropdown-menu dropdown-menu-dark show">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => handleItemClick(link)}
                className={`dropdown-item ${link === selectedItem ? "active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownTitle;
