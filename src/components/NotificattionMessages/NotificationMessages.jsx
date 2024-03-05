import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
const NotificationMessages = () => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Link className="d-flex rounded-0 border-x-0 border-300 border-bottom-0 text-dark">
          <div className="avatar avatar-2xl me-3">
            <img className="rounded-circle "/>
          </div>
          <div className="mb-1">
            <p className="mb-1">
              <strong>Emma Watson</strong> replied to your comment : "Hello
              world 😍"
            </p>
          </div>
        </Link>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default NotificationMessages;
