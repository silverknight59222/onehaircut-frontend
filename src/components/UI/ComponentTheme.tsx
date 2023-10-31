import { createTheme } from '@material-ui/core/styles';

// For MUI design component
const ComponentTheme = createTheme({
    palette: {
        primary: {
            main: '#FF0000', // Customize the primary color
        },
        secondary: {
            main: '#46505A', // Customize the secondary color
        },
        error: {
            main: '#FF0000', // Customize the error color
        },
        warning: {
            main: '#FFC107', // Customize the warning color
        },
        info: {
            main: '#2196F3', // Customize the info color
        },
        success: {
            main: '#4CAF50', // Customize the success color
        },
        text: {
            primary: '#333333', // Customize the primary text color
            secondary: '#666666', // Customize the secondary text color
        },
        background: {
            default: '#FFFFFF', // Customize the default background color
            paper: '#F5F5F5', // Customize the paper background color
        },
        action: {
            active: '#001E3C', // Customize the active action color
        },
        divider: '#BDBDBD', // Customize the divider color
    },
    overrides: {
        MuiSlider: {
            thumb: {
                color: '#000000',
                width: 14, // Set the desired width
                height: 14, // Set the desired height
                border: '3px solid #000000',
                boxShadow: '0px 0px 0px 4px rgb(236, 86, 87, 0.1)',
                backgroundColor: '#FFFF', // The interior color of the thumb
                borderRadius: '50%',// This makes it a circle
                '&:hover, &.Mui-focusVisible': {
                    /* Applies a sharp, translucent black halo shadow around the thumb. */
                    boxShadow: '0px 0px 0px 8px rgb(236, 86, 87, 0.5)',
                },
            },
            track: {
                height: '4px',  // Adjust for desired thickness
                color: '#ec5657',
                background: 'linear-gradient(90deg, red, orange)',
            },
            rail: {
                color: '#000000', //colorForTheUnfilledPart
                height: '4px',  // Adjust for desired thickness
                borderRadius: '16px',
            },
            valueLabel: {
                color: '#000000', // The color of the value label that appears on hover
            },
        },
    },
});

export default ComponentTheme;