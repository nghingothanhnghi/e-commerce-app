import { Card } from "react-bootstrap";
export default function ProfilePicture() {
    return (
        <>
            <Card border='0' className="shadow-sm mb-3">
                <Card.Body>
                    <div className="d-flex align-items-center mb-4 justify-content-center justify-content-md-start">
                        <img className="avatar avatar-lg rounded-circle"/>
                        <div className="ms-3">
                            <h5 className="mb-0"></h5>
                            <small></small>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}
