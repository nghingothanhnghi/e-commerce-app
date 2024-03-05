import { useEffect, useState } from 'react';

const useCalculateHeight = (ref, position) => {
  const [calculatedHeight, setCalculatedHeight] = useState(0);

  const calculateHeight = () => {
    if (ref.current) {
      const screenHeight = window.innerHeight;
      const rect = ref.current.getBoundingClientRect();

      let newHeight = 0;

      if (position === 'top') {
        newHeight = rect.top;
      } else if (position === 'bottom') {
        const spaceAtBottom = screenHeight - rect.bottom;
        newHeight = spaceAtBottom > 0 ? spaceAtBottom : 0;
      }

      setCalculatedHeight(newHeight);
    }
  };

  useEffect(() => {
    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, [ref, position]);

  return calculatedHeight;
};

export default useCalculateHeight;
