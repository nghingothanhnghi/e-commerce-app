import React, { Fragment, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "../../../components/PageHeader/PageHeader";
import TabNavigation from "../../../components/TabNavigation/TabNavigation";
import FilterToolbarDashboard from "./components/filterToolbarDashboard"

export default function Dashboard() {
  const tabs = [
    { label: "Advertiser", link: "advertiser" },
    { label: "Publisher", link: "publisher" },
  ];
  return (
    <>
      <PageHeader title="Dashboard" handleUsingAddNew={false} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <TabNavigation tabs={tabs} /> <FilterToolbarDashboard />
      </div>
      <Outlet />
    </>
  );
}
