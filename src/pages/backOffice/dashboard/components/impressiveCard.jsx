import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { IconEyeCheck } from "@tabler/icons-react";

export default function ImpressiveCard({ posts }) {
  return (
    <Card border="0">
      <Card.Body>
        <IconEyeCheck size={32} color="red" />
        <h6 className="my-2 text-muted">Impression</h6>
        <div className="display-6">0</div>
        <div className="">
          <small className="text-body-secondary">
            How often your ads were shown
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}
