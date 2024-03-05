const NotificationHeader = () => {
  return (
    <ul className="nav nav-pills nav-justified w-100">
      <li className="nav-item">
        <a className="nav-link rounded-pill active" aria-current="page" href="#">
          {" "}
          Activity Logs
        </a>
      </li>
      <li className="nav-item">
        {" "}
        <a className="nav-link rounded-pill" href="#">
          {" "}
          Notifications
        </a>
      </li>
    </ul>
  );
};

export default NotificationHeader;
