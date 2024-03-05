import React, { Fragment, useState, useEffect } from "react";
import GeneralPublisherReportCard from "../components/generalPublisherReportCard";
import ImpressiveChartReportCard from "../components/impressiveChartReportCard";
export default function DashboardPublisher() {
  return (
    <>
      <GeneralPublisherReportCard />
      <ImpressiveChartReportCard />
    </>
  );
}
