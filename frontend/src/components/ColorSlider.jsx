import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  // Import to generate unique IDs

const GradientSlider = ({ value, onChange, min = 0, max = 100 }) => {
    const percent = ((value - min) / (max - min)) * 100;
    const sliderId = `slider-${uuidv4()}`;  // Generate unique slider ID

    // Calculate RGB color dynamically
    const calculateColor = (percent) => {
        const red = Math.min(255, Math.floor((100 - percent) * 2.55));
        const green = Math.min(255, Math.floor(percent * 2.55));
        return `rgb(${red}, ${green}, 0)`;  // Full Red to Green transition
    };

    const thumbColor = calculateColor(percent);

    const sliderStyle = {
        background: `linear-gradient(to right, #f44336, #ffeb3b, #4caf50)`,
    };

    const thumbStyle = `
        #${sliderId}::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 24px;
            height: 24px;
            background: ${thumbColor};
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
            cursor: pointer;
            transition: background-color 0.15s ease;
        }
        #${sliderId}::-moz-range-thumb {
            width: 24px;
            height: 24px;
            background: ${thumbColor};
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
            cursor: pointer;
            transition: background-color 0.15s ease;
        }
    `;

    return (
        <div style={{ width: '100%', margin: '20px 0' }}>
            <style>{thumbStyle}</style>
            <input
                type="range"
                id={sliderId}  // Assign unique ID
                min={min}
                max={max}
                step="0.01"  // Allow decimal precision
                value={value}
                onChange={(e) => {
                    const rawValue = parseFloat(e.target.value);
                    const roundedValue = parseFloat(rawValue.toFixed(2));  // Round to 2 decimals
                    onChange(roundedValue);  // Pass to parent
                }}
                style={{
                    width: '100%',
                    height: '12px',
                    outline: 'none',
                    appearance: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: '#ddd',
                    ...sliderStyle,
                }}
            />
        </div>
    );
};

export default GradientSlider;
