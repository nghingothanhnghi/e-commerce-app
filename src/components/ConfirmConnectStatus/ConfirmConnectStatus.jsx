import React, { useEffect } from 'react';
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { useToast } from "../../hooks/useToast";

const ConfirmConnectStatus = () => {
    const toast = useToast();
    const { isOnline, wasOnline } = useNetworkStatus();

    useEffect(() => {
        if (wasOnline !== undefined && wasOnline !== isOnline) {
            // Show a toast when the network status changes
            const message = isOnline ? 'Network connection restored!' : 'Network connection lost!';
            // Use toast.show to display the message
            toast.info(message);
        }
    }, [isOnline, wasOnline]);

    // return (
    //     <div>
    //         <p>Network Status: {isOnline ? 'Online' : 'Offline'}</p>
    //     </div>
    // );
};

export default ConfirmConnectStatus;
