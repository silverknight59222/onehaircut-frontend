import React, { useState, useEffect } from 'react';
import {
    TotheTopIcon,
} from "@/components/utilis/Icons";
import { Theme_A } from './Themes';
import ReactDOM from 'react-dom';
// get the permission and apply permissions
const applyPermissions = (menus: any) => {
    const temp = localStorage.getItem("user");
    const user = temp ? JSON.parse(temp) : null;
    if (user.role != 'salon_professional' && user.permissions.length > 0) {
        menus.forEach((m: any, k: number) => {
            if (user.permissions.indexOf(m.title) == -1) {
                delete menus[k];
            }
        });
    }
}
/* Scroll to the top button function */
function hasPermission(permission: string): boolean {
    // Get the user data from local storage
    const userData = localStorage.getItem('user');

    // Check if user data exists
    if (userData) {
        // Parse the user data from JSON
        const user = JSON.parse(userData);
        if (user.role == 'salon_professional') {
            return true;
        }
        // Check if the user has a permissions array
        if (Array.isArray(user.permissions)) {
            // Check if the desired permission exists in the permissions array
            if (user.permissions.includes(permission)) {
                return true;
            }
        }
    }

    return false;
}
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



