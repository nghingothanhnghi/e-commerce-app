import { useState } from "react";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { Chart } from "react-google-charts";

export const data = [
  [
    "Day",
    "Guardians of the Galaxy",
    "The Avengers",
    "Transformers: Age of Extinction",
  ],
  [1, 37.8, 80.8, 41.8],
  [2, 30.9, 69.5, 32.4],
  [3, 25.4, 57, 25.7],
  [4, 11.7, 18.8, 10.5],
  [5, 11.9, 17.6, 10.4],
  [6, 8.8, 13.6, 7.7],
  [7, 7.6, 12.3, 9.6],
  [8, 12.3, 29.2, 10.6],
  [9, 16.9, 42.9, 14.8],
  [10, 12.8, 30.9, 11.6],
  [11, 5.3, 7.9, 4.7],
  [12, 6.6, 8.4, 5.2],
  [13, 4.8, 6.3, 3.6],
  [14, 4.2, 6.2, 3.4],
];

// export const options = {
//   chart: {
//     title: "Box Office Earnings in First Two Weeks of Opening",
//     subtitle: "in millions of dollars (USD)",
//   },
// };

export default function ImpressiveChartReportCard() {
  return (
    <Card border="0" className="shadow-sm mb-4">
      <Card.Header className="border-bottom-0 px-4 pt-4 bg-white">
        <b>Impressive Performance Detail</b>
      </Card.Header>
      <Card.Body className="px-4">
        <Row>
          <Col lg="4">
            <h6 className="my-2 text-muted">How often your ads are shown</h6>
            <p className="mt-3">
              An impression is counted every time your ad is shown. The more
              impressions you have, the more likely you are to get clicks on
              your ad. Impressions build brand awareness, which helps people
              recognize and recall your business. You're not charged for
              impressions.
            </p>
          </Col>
          <Col lg="8">
            <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={data}
            //   options={options}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
