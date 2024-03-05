import { useRef } from 'react';
import { useToast } from '../hooks/useToast'; // Import your toast hook

const useCopyToClipboard = () => {
  const inputRef = useRef(null);
  const toast = useToast();

  const copyToClipboard = () => {
    // Check if the input reference exists
    if (inputRef.current) {
      // Select the text inside the input
      inputRef.current.select();
      // Copy the selected text to the clipboard
      document.execCommand('copy');
      // Deselect the text
      inputRef.current.setSelectionRange(0, 0);
      // Show a toast or any other indication that the text is copied
      toast.success('Copied to clipboard!');
    }
  };

  return { inputRef, copyToClipboard };
};

export default useCopyToClipboard;
