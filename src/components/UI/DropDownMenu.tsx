import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 200,
        marginBottom: theme.spacing(2),
        border: '1px solid ' + theme.palette.grey[400],
        textAlign: 'center',
        borderRadius: '10px',
        '& .MuiInput-underline:before': {
            display: 'none',
        },
        '& .MuiInput-underline:after': {
            display: 'none',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            display: 'none',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
    },
    inputLabel: {
        color: theme.palette.grey[500],
        marginLeft: theme.spacing(1),
        "&.Mui-focused": {
            color: theme.palette.grey[500]
        }
    },
    menuItem: {
        fontSize: '0.875rem',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
            borderRadius: '10px',
        },
        '&$selected': {
            background: 'linear-gradient(35deg, #FFE190, #FFF7E1)', // This is a gradient from #E88018 to #FFB040 at a 45-degree angle
            borderRadius: '10px',
            fontWeight: '600',
            margin: theme.spacing(1, 1),
            color: '#3D3D3D',
        },

        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(0.5),
        margin: theme.spacing(1, 1),
    },
    select: {
        '& .MuiMenu-paper': {
            borderRadius: '25px',
        },
    },
    selected: {},
}));

const DropdownMenu = ({
    dropdownItems = [""],
    menuName = '',
    fctToCallOnClick = (item: string) => { },
    labelId = '',
    selectId = '',
    defaultSelected='',
}) => {
    const classes = useStyles();
    const [selectedItem, setSelectedItem] = useState('');

    const handleChange = (item: any) => {
        setSelectedItem(item);
        fctToCallOnClick(item);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel
                    id={labelId}
                    className={classes.inputLabel}
                >
                    {menuName}
                </InputLabel>
                <Select
                    labelId={labelId}
                    id={labelId}
                    value={selectedItem}
                    onChange={(event) => handleChange(event.target.value)}
                    className={classes.select}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                        PaperProps: {
                            style: {
                                marginTop: '10px',
                                borderRadius: '15px',  // for rounded modal corners
                            }
                        }
                    }}
                >
                    {dropdownItems.map((item, index) => (
                        <MenuItem
                            key={index}
                            value={item}
                            className={classes.menuItem}
                            classes={{ selected: classes.selected }}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default DropdownMenu;
