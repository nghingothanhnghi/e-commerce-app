import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IconMapPin } from '@tabler/icons-react';




export default function LocationCard({ posts }) {
  return (
    <Card border="0">
      <Card.Body>
      <IconMapPin size={32} color="blue" />
        <h6 className="my-2 text-muted">Local Actions</h6>
        <div className="display-6">0</div>
        <div className="">
          <small className="text-body-secondary">
          Actions showing intent to visit
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}
