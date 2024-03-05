import React from "react";
import { NavLink } from "react-router-dom";

const TabNavigation = ({ tabs }) => {
    return (
        <ul className="nav nav-pills">
            {tabs.map((tab) => (
                <li key={tab.link} className="nav-item">
                    <NavLink
                        to={tab.link}
                        className="nav-link"
                        activeClassName="active"
                    >
                        {tab.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default TabNavigation;
