import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    Dropdown,
    DropdownButton,
} from "react-bootstrap";
import { IconUserCircle, IconLock, IconLogout } from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';
import { useAuthContext } from "../../contexts/AuthContext";
import { removeToken } from "../../helpers/helpers";
import { USER_TYPES } from "../../constants/userTypes";
const AuthButton = () => {
    const { t } = useTranslation();
    const { user, setUser } = useAuthContext();
    const navigate = useNavigate();
    const handleLogout = () => {
        removeToken();
        setUser(undefined);
        // Assuming you have the userType in your user object
        if (user?.userType) {
            switch (user.userType) {
                case USER_TYPES.ADVERTISER:
                    navigate("/", { replace: true });
                    break;
                case USER_TYPES.PUBLISHER:
                    navigate("/", { replace: true });
                    break;
                // Add more cases for other user types if needed
                default:
                    navigate("/", { replace: true });
            }
        } else {
            // Default redirect if userType is not available
            navigate("/", { replace: true });
        }
    };
    return (
        <>
            {user ? (
                <Dropdown className="ms-3" align="end">
                    <Dropdown.Toggle variant="light" size="sm" className="btn-circle no-caret">
                        <img className="rounded-circle" src={user?.avatar_url || 'https://gravatar.com/avatar/1425bc5c8115243ef4f5a9486e71e7fc?s=400&d=robohash&r=x'} width={30} height={31} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Link to="/profile" className="dropdown-item d-flex align-items-center">
                            <IconUserCircle size={18} className="me-2" />
                            Profile
                        </Link>

                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout} className="d-flex align-items-center"> <IconLogout size={18} stroke={2} className="me-2" /> Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <>
                    <NavLink to="/signin/publisher" className="btn btn-light btn-sm btn-circle">
                        <IconLock size={18} />
                    </NavLink>
                    <NavLink to="/signup/publisher" className="btn btn-outline-dark btn-sm px-4 rounded-pill ms-2">
                        {t('register')}
                    </NavLink>
                </>
            )}
        </>
    );
};

export default AuthButton;
