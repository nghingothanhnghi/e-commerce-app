import Toast from './Toast';

const ToastsContainer = ({ toasts, position = "top-right" }) => {
    return (
      <div className={`toasts-container position-fixed p-3 ${position}`}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    );
  };

export default ToastsContainer;