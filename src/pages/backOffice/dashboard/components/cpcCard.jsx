import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IconHandClick } from '@tabler/icons-react';


export default function CpcCard({ posts }) {
  return (
    <Card border='0'>
      <Card.Body>
      <IconHandClick size={32} color="green" />
        <h6 className="my-2 text-muted">Clicks</h6>
        <div className="display-6">0</div>
        <div className="">
          <small className="text-body-secondary">
          Actions on your ads
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}
