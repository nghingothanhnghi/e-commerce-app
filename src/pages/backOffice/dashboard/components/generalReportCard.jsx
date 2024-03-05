import { useState } from "react";
import { Row, Col, Button, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import CpcCard from "./cpcCard";
import ImpressiveCard from "./impressiveCard";
import LocationCard from "./locationCard";
import ConversionCard from "./conversionCard";

export default function GeneralReportCard() {
  return (
    <>
      <Card border="0" className="shadow-sm mb-4">
        <Card.Header className="border-bottom-0 px-4 pt-4 bg-white">
          <b>0đ</b> Spend in the last 7 days
        </Card.Header>
        <Card.Body>
          <CardGroup>
            <ImpressiveCard />
            <CpcCard />
            <LocationCard />
            <ConversionCard />
          </CardGroup>
        </Card.Body>
        <Card.Footer className="bg-white">
          <Link to="" className="btn btn-link text-dark">
            View performance details
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
}
