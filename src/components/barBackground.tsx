"use client";

import React, { useState, useEffect } from "react";



export function BarBackground() {

    interface Bar {
        id: number;
        height: number;
        offset: number;
        alpha: number; // Added alpha value for opacity control
      }

    
    const [bars, setBars] = useState<Bar[]>([]); // State for bars with explicit type

    // This useEffect ensures bars are set only on the client side
    useEffect(() => {
        const newBars: Bar[] = Array.from({ length: 10 }, (_, index) => ({
            id: index,
            height: Math.floor(Math.random() * (200) + 50), // Random height
            offset: Math.random() * 2, // Random offset for animation timing
            alpha: Math.random() * 0.3 + 0.1, // Random alpha between 0.1 and 0.4
        }));
        setBars(newBars);
    }, []); // Empty dependency array ensures it runs only once after initial render

    return(
        <>        
            <div className="bar-container absolute left-0 right-0 flex flex-row items-end -z-50">
            {/* Bars with different heights and offsets */}
                {bars.map((bar) => (
                    <div
                        key={bar.id}
                        className="bar flex-1"
                        style={{
                            height: `${bar.height}px`, // Random height
                            animationName: "moveUpDown", // Define animation name explicitly
                            animationDuration: "2s", // Animation duration
                            animationTimingFunction: "ease-in-out", // Timing function
                            animationDelay: `${bar.offset}s`, // Random offset for each bar
                            animationIterationCount: "infinite", // Infinite looping
                            backgroundColor: `rgba(0, 0, 0, ${bar.alpha})`, // Set background color with varying alpha
                        }}
                    ></div>
                ))}
            </div>
        </>

)}