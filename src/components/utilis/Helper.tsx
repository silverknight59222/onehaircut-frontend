import React, { useState, useEffect } from 'react';
import {
    TotheTopIcon,
} from "@/components/utilis/Icons";
import { Theme_A } from './Themes';
import ReactDOM from 'react-dom';


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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }; 200

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, []);

    return (
        <button
            onClick={scrollTop}
            style={{ display: isVisible ? 'block' : 'none' }}
            className={`${Theme_A.button.scrollToTheTopButton}`}
        >
            <TotheTopIcon />

        </button>
    );
}
export default ScrollToTopButton;



