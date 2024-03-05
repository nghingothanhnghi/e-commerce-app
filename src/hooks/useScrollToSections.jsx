import { useRef, useEffect } from 'react';

const useScrollToSections = () => {
    const scrollToSection = (sectionName) => {
      useEffect(() => {
        console.log(`Scrolling to section: ${sectionName}`);
        const sectionRef = document.getElementById(sectionName.toLowerCase());
  
        if (sectionRef) {
          console.log("Section found, scrolling.");
          sectionRef.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.log(`Section with id ${sectionName} not found.`);
        }
      }, [sectionName]); // Run the effect when sectionName changes
    };
  
    return { scrollToSection };
  };

export default useScrollToSections;
