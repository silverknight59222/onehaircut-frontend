import React from 'react';
import { ThemeProvider, Typography, Slider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import ComponentTheme from '@/components/UI/ComponentTheme';

// Define the type for your props
interface CustomSliderProps {
  theme: any; // You can specify the exact type for 'theme'
  value: number[];
  unit: string; // Add the 'unit' prop
  onChange: (event: React.ChangeEvent<{}>, newValue: number | number[]) => void;
  min: number;
  max: number;
  label: string;
  valueLabelDisplay: 'auto' | 'on' | 'off';
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  theme,
  value,
  unit, // Include the 'unit' prop here
  onChange,
  min,
  max,
  label,
  valueLabelDisplay,
}) => {
  return (
    <ThemeProvider theme={ComponentTheme}>
      <p className="text-black text-sm mb-0 font-md text-center">{label}</p>
      <div className="flex flex-col items-center justify-center">
        <Typography id="range-slider" gutterBottom></Typography>
        <Slider
          value={value}
          onChange={onChange}
          valueLabelDisplay={valueLabelDisplay}
          min={min}
          max={max}
          style={{ width: '100%' }}
        />
        <div className="mt-0 text-center">
          &#91;
          <span style={{ fontSize: '0.8em', fontWeight: '500', color: '#757575' }}>
            {value[0]}{unit} &#8211; {value[1]}{unit}
          </span>
          &#93;
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CustomSlider;
