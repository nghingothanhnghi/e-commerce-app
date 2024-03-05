import { useEffect, useState, useMemo } from 'react';
import { useToast } from './useToast';

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOnline, setWasOnline] = useState(isOnline);
  const toast = useToast();

  const handleOnline = () => {
    setIsOnline(true);
    setWasOnline(true);
    toast.success('You are now online!');
  };

  const handleOffline = () => {
    setIsOnline(false);
    setWasOnline(true);
    toast.info('You are now offline. Please check your wireless connection.');
  };

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const memoizedResult = useMemo(() => {
    return {
      isOnline,
      wasOnline,
    };
  }, [isOnline, wasOnline]);

  return memoizedResult;
};

export default useNetworkStatus;
