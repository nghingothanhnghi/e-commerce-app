import React, { Fragment, useState, useEffect } from "react";
import GeneralReportCard from "../components/generalReportCard";
import ImpressiveChartReportCard from "../components/impressiveChartReportCard";
export default function DashboardAdvertiser() {
  return (
    <>
      <GeneralReportCard />
      <ImpressiveChartReportCard />
    </>
  );
}
