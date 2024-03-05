import { useEffect, useRef, useState } from "react";
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconInfoCircleFilled,
  IconX,
} from "@tabler/icons-react";
import { useToast } from "../hooks/useToast";
const toastTypes = {
  success: {
    boxClass: "bg-success text-white",
    icon: <IconCircleCheckFilled />,
    iconClass: "success-icon",
    progressBarClass: "success",
  },
  warning: {
    boxClass: "bg-warning-subtle text-white",
    icon: <IconAlertCircleFilled />,
    iconClass: "warning-icon",
    progressBarClass: "warning",
  },
  info: {
    boxClass: "bg-dark text-white",
    icon: <IconInfoCircleFilled />,
    iconClass: "info-icon",
    progressBarClass: "info",
  },
  error: {
    boxClass: "bg-danger text-white",
    icon: <IconCircleXFilled />,
    iconClass: "error-icon",
    progressBarClass: "error",
  },
};

const Toast = ({ message, type, id }) => {
  const { boxClass, icon, iconClass } = toastTypes[type];
  const toast = useToast(); // call useToast
  const [dismissed, setDismissed] = useState(false);
  const handleDismiss = () => {
    setDismissed(true);
    setTimeout(() => {
      toast.remove(id);
    }, 400);
  };

  const timerID = useRef(null);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 4000);

    return () => {
      clearTimeout(timerID.current);
    };
  }, []);

  return (
    <div className={`toast fade ${boxClass} ${dismissed ? "hide" : "show"}`}>
      <div className="toast-body">
        <div className="d-flex justify-content-between">
          <span className={iconClass}>{icon}</span>
          <div className="col ps-2"> {message}</div>
          <button onClick={handleDismiss} className="btn-close"></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
