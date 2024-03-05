import React from "react";
import Button from "react-bootstrap/Button";
import { IconCirclePlus } from "@tabler/icons-react";

import { useAuthContext } from "../../contexts/AuthContext";

const PageHeader = ({ title, showAddNewDialog, handleUsingAddNew }) => {

  const { user } = useAuthContext();

  return (
    <div className="page-title d-flex py-2 pt-lg-4 pb-lg-3 justify-content-between">
      <h1 className="page-heading d-flex text-gray-900 fw-bold fs-4 flex-column justify-content-center my-0">
        {title}
      </h1>
      {handleUsingAddNew && (user?.userType === "advertiser" || user?.userType === "admin") && (
        <Button
          variant="light"
          size="sm"
          onClick={showAddNewDialog}
          className="d-flex align-items-center px-3"
        >
          <IconCirclePlus size={18} className="me-2 text-primary" />
          Add New
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
