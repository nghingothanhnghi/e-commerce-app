import React from "react";
import { IconMenuOrder } from "@tabler/icons-react";
import { Form, Row, Col, Dropdown } from 'react-bootstrap';

const AdvanceFilterData = ({ labels }) => {
    return (
        <Dropdown align="end">
            <Dropdown.Toggle variant="light" className='ms-2 border no-caret'>
                <IconMenuOrder size={18} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-297">
                <Row>
                    <Col>
                        <Dropdown.Header>Displayed Columns</Dropdown.Header>
                        <div className="p-3">
                            {labels.map((label, index) => (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    label={label}
                                />
                            ))}
                        </div>
                    </Col>
                </Row>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default AdvanceFilterData;
