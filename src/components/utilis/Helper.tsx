import React, { useState, useEffect } from 'react';
import {
    TotheTopIcon,
  } from "@/components/utilis/Icons";


/* Scroll to the top button function */

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // check if the button should be visible
    const checkScrollTop = () => {
        const yOffset = document.documentElement.scrollTop || document.body.scrollTop;
    
        if (!isVisible && yOffset > 400) {
            setIsVisible(true);
        } else if (isVisible && yOffset <= 400) {
            setIsVisible(false);
        }
    };
    
    // auto scroll to the top
    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };200

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, []);

    return (
        <button 
            onClick={scrollTop} 
            style={{display: isVisible ? 'block' : 'none'}}
            className="fixed bottom-10 right-10 p-4 bg-stone-900 text-sm text-white px-6 py-2 rounded-full transform hover:scale-105 transition-transform"
        >
            <TotheTopIcon />
            
        </button>
    );
}

export default ScrollToTopButton;
