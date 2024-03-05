import { useState } from 'react';

const useToggleClass = (initialState = false) => {
  const [isActive, setIsActive] = useState(initialState);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  return [isActive, toggleClass];
};

export default useToggleClass;
