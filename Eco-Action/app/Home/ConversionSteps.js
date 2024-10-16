"use client";
import React, { useEffect, useState } from 'react';

const food = "/images/food.svg";
const recycle = "/images/recycle.svg";
const manure = "/images/manure.svg";
const addManure = "/images/addManure.svg";
const heroSection = "/images/heroSection.svg";

// Step data
const stepsData = [
    { number: 1, image: food, text: "Collect food waste" },
    { number: 2, image: recycle, text: "Sort the waste" },
    { number: 3, image: manure, text: "Compost the waste" },
    { number: 4, image: addManure, text: "Use fertilizer" },
    { number: 5, image: heroSection, text: "Better environment" },
];

export function ConversionSteps() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % stepsData.length);
        }, 1000); // Change step every 3 seconds

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    return (
        <ol className="flex items-center justify-center w-full gap-24">
            {stepsData.map((step, index) => (
                <li
                    key={step.number}
                    className={`flex flex-col items-center text-[#116A7B] transition-transform duration-500 transform ${currentStep === index ? 'scale-110 opacity-100' : 'scale-90 opacity-50'}`}
                >
                    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                        <span className="text-lg font-semibold">{step.number}</span>
                    </span>
                    <img
                        src={step.image}
                        alt={`Step ${step.number}`}
                        className="object-cover w-20 h-20 mt-2 transition-opacity duration-500 rounded-full"
                    />
                    <span className="mt-2 text-white">{step.text}</span>
                </li>
            ))}
        </ol>
    );
}
