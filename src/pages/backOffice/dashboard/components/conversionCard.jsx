import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IconChartAreaLine } from '@tabler/icons-react';


export default function ConversionCard({ posts }) {
  return (
    <Card border='0'>
      <Card.Body>
      <IconChartAreaLine size={32} color="orange" />
        <h6 className="my-2 text-muted">Conversions</h6>
        <div className="display-6">0</div>
        <div className="">
          <small className="text-body-secondary">
          Actions on your website from ads
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}
