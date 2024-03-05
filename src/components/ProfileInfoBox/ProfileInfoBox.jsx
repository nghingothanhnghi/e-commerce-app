import React from "react";
import Button from "react-bootstrap/Button";
import { IconUserCircle, IconLock, IconLogout, IconUserUp } from "@tabler/icons-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTranslation } from 'react-i18next';
import { removeToken } from "../../helpers/helpers";
import { USER_TYPES } from "../../constants/userTypes";

const ProfileInfoBox = ({ title, showAddNewDialog, handleUsingAddNew }) => {
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
                <div className="d-flex w-100 justify-content-between align-items-center gap-2 pe-2">
                    <img src={user.avatar_url} width={46} height={46} className="rounded-circle" />
                    <div className="col">
                        <small className="text-muted">Signed in as:</small>
                        <h6 className="text-truncate">{user.firstName}</h6>
                    </div>
                    <div className="d-flex">
                        <Button variant="light" size="sm" onClick={handleLogout} className="d-flex align-items-center rounded-pill"><IconLogout size={18} className="me-1" /> Sign Out</Button>
                        <Link to="/profile" className="btn btn-sm btn-light btn-circle ms-2">
                            <IconUserCircle size={18} />
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="d-flex w-100 pe-3">
                    <Link to="/signin/publisher" className="btn btn-light rounded-pill col d-flex justify-content-center align-items-center">
                        <IconLock size={18} className="me-1" />
                        {t('signin')}
                    </Link>
                    <Link to="/signup/publisher" className="btn btn-light rounded-pill col d-flex justify-content-center align-items-center ms-2">
                        <IconUserUp size={18} className="me-1"/>
                        {t('register')}
                    </Link>
                </div>
            )}
        </>
    );
};

export default ProfileInfoBox;
