// // ///////////////////////////////////////////////
// // "use client";

// // import React, { useState } from "react";
// // import { calculateEnvironmentalImpact } from "./calculationUtils";
// // import { AlertCircle } from "lucide-react";
// // import { motion } from "framer-motion";

// // const CalculatorPage = () => {
// //   const [foodWaste, setFoodWaste] = useState("");
// //   const [results, setResults] = useState(null);
// //   const [error, setError] = useState("");

// //   const handleCalculate = () => {
// //     const wasteAmount = parseFloat(foodWaste);
// //     if (isNaN(wasteAmount) || wasteAmount <= 0) {
// //       setError("Please enter a valid amount of food waste");
// //       setResults(null);
// //       return;
// //     }
// //     setError("");
// //     const impact = calculateEnvironmentalImpact(wasteAmount);
// //     setResults(impact);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
// //       <motion.div
// //         className="max-w-lg w-full bg-white rounded-lg shadow-2xl overflow-hidden"
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.5 }}
// //       >
// //         <div className="px-6 py-8">
// //           <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
// //             Environmental Impact Calculator
// //           </h1>
// //           <motion.div
// //             className="mb-4"
// //             initial={{ x: -50, opacity: 0 }}
// //             animate={{ x: 0, opacity: 1 }}
// //             transition={{ delay: 0.2, duration: 0.5 }}
// //           >
// //             <label
// //               htmlFor="foodWaste"
// //               className="block text-lg font-medium text-gray-700 mb-2"
// //             >
// //               Amount of Food Waste (kg)
// //             </label>
// //             <input
// //               type="number"
// //               id="foodWaste"
// //               value={foodWaste}
// //               onChange={(e) => setFoodWaste(e.target.value)}
// //               className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               placeholder="Enter amount in kg"
// //             />
// //           </motion.div>
// //           {error && (
// //             <motion.div
// //               className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ delay: 0.3, duration: 0.4 }}
// //             >
// //               <AlertCircle className="h-6 w-6 mr-3" />
// //               <span>{error}</span>
// //             </motion.div>
// //           )}
// //           <motion.button
// //             onClick={handleCalculate}
// //             className="w-full bg-green-500 text-white text-lg px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //           >
// //             Calculate Impact
// //           </motion.button>
// //           {results && (
// //             <motion.div
// //               className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6"
// //               initial={{ y: 50, opacity: 0 }}
// //               animate={{ y: 0, opacity: 1 }}
// //               transition={{ delay: 0.4, duration: 0.6 }}
// //             >
// //               <h2 className="text-2xl font-semibold text-green-800 mb-4">
// //                 Environmental Impact:
// //               </h2>
// //               <div className="grid grid-cols-2 gap-6 text-center">
// //                 <div>
// //                   <p className="text-sm text-gray-600">Fertilizer Produced</p>
// //                   <p className="text-2xl font-medium text-green-700">
// //                     {results.fertilizerProduced} kg
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">CO2 Emissions Reduced</p>
// //                   <p className="text-2xl font-medium text-green-700">
// //                     {results.co2Reduced} kg
// //                   </p>
// //                 </div>
// //                 <div className="col-span-2">
// //                   <p className="text-sm text-gray-600">Waste Reduced</p>
// //                   <p className="text-2xl font-medium text-green-700">
// //                     {results.wasteReduced} kg
// //                   </p>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default CalculatorPage;
// // /////////////////////////////////////////////////////////////////////////////////
// // "use client";

// // import React, { useState } from "react";
// // import { calculateEnvironmentalImpact } from "./calculationUtils";
// // import { AlertCircle } from "lucide-react";

// // const CalculatorPage = () => {
// //   const [foodWaste, setFoodWaste] = useState("");
// //   const [results, setResults] = useState(null);
// //   const [error, setError] = useState("");

// //   const handleCalculate = () => {
// //     const wasteAmount = parseFloat(foodWaste);
// //     if (isNaN(wasteAmount) || wasteAmount <= 0) {
// //       setError("Please enter a valid amount of food waste");
// //       setResults(null);
// //       return;
// //     }
// //     setError("");
// //     const impact = calculateEnvironmentalImpact(wasteAmount);
// //     setResults(impact);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
// //         <div className="px-4 py-5 sm:p-6">
// //           <h1 className="text-2xl font-bold text-gray-900 mb-6">
// //             Environmental Impact Calculator
// //           </h1>
// //           <div className="mb-4">
// //             <label
// //               htmlFor="foodWaste"
// //               className="block text-sm font-medium text-gray-700 mb-2"
// //             >
// //               Amount of Food Waste (kg)
// //             </label>
// //             <input
// //               type="number"
// //               id="foodWaste"
// //               value={foodWaste}
// //               onChange={(e) => setFoodWaste(e.target.value)}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               placeholder="Enter amount in kg"
// //             />
// //           </div>
// //           {error && (
// //             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
// //               <div className="flex items-center">
// //                 <AlertCircle className="h-5 w-5 mr-2" />
// //                 <span>{error}</span>
// //               </div>
// //             </div>
// //           )}
// //           <button
// //             onClick={handleCalculate}
// //             className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
// //           >
// //             Calculate Impact
// //           </button>
// //           {results && (
// //             <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
// //               <h2 className="text-lg font-semibold text-green-800 mb-3">
// //                 Environmental Impact:
// //               </h2>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <p className="text-sm text-gray-600">Fertilizer Produced</p>
// //                   <p className="text-lg font-medium text-green-700">
// //                     {results.fertilizerProduced} kg
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Waste Reduced</p>
// //                   <p className="text-lg font-medium text-green-700">
// //                     {results.wasteReduced} kg
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">
// //                     CO2 Reduced from Fertilizer
// //                   </p>
// //                   <p className="text-lg font-medium text-green-700">
// //                     {results.co2ReducedFromFertilizer} kg
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">
// //                     Landfill Emissions Avoided
// //                   </p>
// //                   <p className="text-lg font-medium text-green-700">
// //                     {results.landfillEmissionsAvoided} kg
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">
// //                     Recycling Emissions Reduced
// //                   </p>
// //                   <p className="text-lg font-medium text-green-700">
// //                     {results.recyclingEmissionsReduced} kg
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Total CO2 Reduced</p>
// //                   <p className="text-lg font-medium text-green-700">
// //                     {results.totalCO2Reduced} kg
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="mt-4 text-sm text-gray-600">
// //                 <p>
// //                   By recycling {results.wasteReduced} kg of food waste, you've
// //                   made a significant environmental impact!
// //                 </p>
// //                 <p>
// //                   You've helped produce {results.fertilizerProduced} kg of
// //                   fertilizer and reduced total CO2 emissions by{" "}
// //                   {results.totalCO2Reduced} kg.
// //                 </p>
// //                 <p>
// //                   This includes avoiding {results.landfillEmissionsAvoided} kg
// //                   of landfill emissions and reducing{" "}
// //                   {results.recyclingEmissionsReduced} kg through recycling.
// //                 </p>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CalculatorPage;
// // /////////////////
// ///////
// ///////////////////
// // "use client";

// // import React, { useState } from "react";
// // import { calculateEnvironmentalImpact } from "./calculationUtils";
// // import { Leaf, AlertCircle } from "lucide-react";

// // const CalculatorPage = () => {
// //   const [foodWaste, setFoodWaste] = useState("");
// //   const [results, setResults] = useState(null);
// //   const [error, setError] = useState("");

// //   const handleCalculate = () => {
// //     const wasteAmount = parseFloat(foodWaste);
// //     if (isNaN(wasteAmount) || wasteAmount <= 0) {
// //       setError("الرجاء إدخال كمية صالحة من نفايات الطعام");
// //       setResults(null);
// //       return;
// //     }
// //     setError("");
// //     const impact = calculateEnvironmentalImpact(wasteAmount);
// //     setResults(impact);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
// //       <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md w-full">
// //         <div className="bg-green-600 text-white p-6 flex items-center justify-between">
// //           <h1 className="text-2xl font-bold">حاسبة الأثر البيئي</h1>
// //           <Leaf className="w-8 h-8" />
// //         </div>
// //         <div className="p-6">
// //           <div className="mb-6">
// //             <label
// //               htmlFor="foodWaste"
// //               className="block text-sm font-medium text-gray-700 mb-2"
// //             >
// //               كمية نفايات الطعام (كجم)
// //             </label>
// //             <input
// //               type="number"
// //               id="foodWaste"
// //               value={foodWaste}
// //               onChange={(e) => setFoodWaste(e.target.value)}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               placeholder="أدخل الكمية بالكيلوجرام"
// //               dir="rtl"
// //             />
// //           </div>
// //           {error && (
// //             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-full flex items-center">
// //               <AlertCircle className="h-5 w-5 mr-2" />
// //               <span>{error}</span>
// //             </div>
// //           )}
// //           <button
// //             onClick={handleCalculate}
// //             className="w-full bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
// //           >
// //             حساب الأثر
// //           </button>
// //           {results && (
// //             <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4">
// //               <h2 className="text-lg font-semibold text-green-800 mb-3">
// //                 الأثر البيئي:
// //               </h2>
// //               <div className="grid grid-cols-2 gap-4 text-right">
// //                 {Object.entries(results).map(([key, value]) => (
// //                   <div key={key} className="bg-white p-3 rounded-xl shadow-sm">
// //                     <p className="text-sm text-gray-600">
// //                       {key === "fertilizerProduced" && "السماد المنتج"}
// //                       {key === "wasteReduced" && "النفايات المخفضة"}
// //                       {key === "co2ReducedFromFertilizer" &&
// //                         "CO2 المخفض من السماد"}
// //                       {key === "landfillEmissionsAvoided" &&
// //                         "انبعاثات المكب المتجنبة"}
// //                       {key === "recyclingEmissionsReduced" &&
// //                         "انبعاثات إعادة التدوير المخفضة"}
// //                       {key === "totalCO2Reduced" && "إجمالي CO2 المخفض"}
// //                     </p>
// //                     <p className="text-lg font-medium text-green-700">
// //                       {value} كجم
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //               <div className="mt-4 text-sm text-gray-600 bg-white p-4 rounded-xl">
// //                 <p>
// //                   بإعادة تدوير {results.wasteReduced} كجم من نفايات الطعام، لقد
// //                   أحدثت تأثيرًا بيئيًا كبيرًا!
// //                 </p>
// //                 <p>
// //                   ساعدت في إنتاج {results.fertilizerProduced} كجم من السماد
// //                   وخفضت إجمالي انبعاثات CO2 بمقدار {results.totalCO2Reduced}{" "}
// //                   كجم.
// //                 </p>
// //                 <p>
// //                   يشمل ذلك تجنب {results.landfillEmissionsAvoided} كجم من
// //                   انبعاثات المكب وتخفيض {results.recyclingEmissionsReduced} كجم
// //                   من خلال إعادة التدوير.
// //                 </p>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CalculatorPage;
// ////////////////////
// "use client";

// import React, { useState } from "react";
// import { calculateEnvironmentalImpact } from "./calculationUtils";
// import { Leaf, AlertCircle } from "lucide-react";

// const CalculatorPage = () => {
//   const [foodWaste, setFoodWaste] = useState("");
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState("");

//   const handleCalculate = () => {
//     const wasteAmount = parseFloat(foodWaste);
//     if (isNaN(wasteAmount) || wasteAmount <= 0) {
//       setError("Please enter a valid amount of food waste");
//       setResults(null);
//       return;
//     }
//     setError("");
//     const impact = calculateEnvironmentalImpact(wasteAmount);
//     setResults(impact);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
//       <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md w-full">
//         <div className="bg-green-600 text-white p-6 flex items-center justify-between">
//           <h1 className="text-2xl font-bold">
//             Environmental Impact Calculator
//           </h1>
//           <Leaf className="w-8 h-8" />
//         </div>
//         <div className="p-6">
//           <div className="mb-6">
//             <label
//               htmlFor="foodWaste"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Food Waste Amount (kg)
//             </label>
//             <input
//               type="number"
//               id="foodWaste"
//               value={foodWaste}
//               onChange={(e) => setFoodWaste(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="Enter amount in kg"
//             />
//           </div>
//           {error && (
//             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-full flex items-center">
//               <AlertCircle className="h-5 w-5 mr-2" />
//               <span>{error}</span>
//             </div>
//           )}
//           <button
//             onClick={handleCalculate}
//             className="w-full bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
//           >
//             Calculate Impact
//           </button>
//           {results && (
//             <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4">
//               <h2 className="text-lg font-semibold text-green-800 mb-3">
//                 Environmental Impact:
//               </h2>
//               <div className="grid grid-cols-2 gap-4">
//                 {Object.entries(results).map(([key, value]) => (
//                   <div key={key} className="bg-white p-3 rounded-xl shadow-sm">
//                     <p className="text-sm text-gray-600">
//                       {key
//                         .replace(/([A-Z])/g, " $1")
//                         .replace(/^./, (str) => str.toUpperCase())}
//                     </p>
//                     <p className="text-lg font-medium text-green-700">
//                       {value} kg
//                     </p>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 text-sm text-gray-600 bg-white p-4 rounded-xl">
//                 <p>
//                   By recycling {results.wasteReduced} kg of food waste, you've
//                   made a significant environmental impact!
//                 </p>
//                 <p>
//                   You've helped produce {results.fertilizerProduced} kg of
//                   fertilizer and reduced total CO2 emissions by{" "}
//                   {results.totalCO2Reduced} kg.
//                 </p>
//                 <p>
//                   This includes avoiding {results.landfillEmissionsAvoided} kg
//                   of landfill emissions and reducing{" "}
//                   {results.recyclingEmissionsReduced} kg through recycling.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalculatorPage;
// ///////////////

// "use client";

// import React, { useState } from "react";
// import { calculateEnvironmentalImpact } from "./calculationUtils";
// import { ChevronDown } from "lucide-react";

// const CalculatorPage = () => {
//   const [foodWaste, setFoodWaste] = useState("");
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState("");

//   const handleCalculate = () => {
//     const wasteAmount = parseFloat(foodWaste);
//     if (isNaN(wasteAmount) || wasteAmount <= 0) {
//       setError("Please enter a valid amount of food waste");
//       setResults(null);
//       return;
//     }
//     setError("");
//     const impact = calculateEnvironmentalImpact(wasteAmount);
//     setResults(impact);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
//       <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full flex">
//         {/* Left panel */}
//         <div className="w-1/2 bg-gray-50 p-8 flex flex-col justify-between">
//           <div>
//             <h1 className="text-4xl font-bold mb-2">
//               <span className="text-orange-400">Environmental</span>
//               <br />
//               <span className="text-navy-800">Impact Calculator</span>
//             </h1>
//           </div>
//           <div className="relative w-48 h-48 mx-auto">
//             <div className="absolute inset-0 bg-sky-200 rounded-full"></div>
//             <div className="absolute inset-4 bg-sky-400 rounded-2xl transform rotate-12"></div>
//             <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 rounded-full shadow-lg"></div>
//             <div className="absolute bottom-4 right-4 w-16 h-16 bg-yellow-400 rounded-full shadow-lg"></div>
//           </div>
//         </div>

//         {/* Right panel */}
//         <div className="w-1/2 bg-sky-200 p-8">
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <span className="text-sky-800">Calculate</span>
//               <div className="relative">
//                 <select className="appearance-none bg-white rounded-md py-2 px-4 pr-8 shadow-sm text-sky-800">
//                   <option>The final amount</option>
//                 </select>
//                 <ChevronDown
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-800"
//                   size={20}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center">
//               <span className="w-1/3 text-sky-800">Food waste</span>
//               <div className="w-2/3 flex">
//                 <input
//                   type="number"
//                   value={foodWaste}
//                   onChange={(e) => setFoodWaste(e.target.value)}
//                   className="flex-grow bg-white rounded-l-md py-2 px-4 shadow-sm"
//                   placeholder="Enter amount"
//                 />
//                 <select className="bg-white rounded-r-md py-2 px-2 shadow-sm border-l text-sky-800">
//                   <option>kg</option>
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={handleCalculate}
//               className="w-full bg-orange-400 text-white py-3 rounded-md hover:bg-orange-500 transition-colors duration-200"
//             >
//               CALCULATE
//             </button>

//             {error && <div className="text-red-600 text-sm">{error}</div>}

//             {results && (
//               <div className="bg-white rounded-md p-4 shadow-sm">
//                 <h2 className="text-lg font-semibold text-sky-800 mb-2">
//                   Environmental Impact:
//                 </h2>
//                 <div className="grid grid-cols-2 gap-2 text-sm">
//                   {Object.entries(results).map(([key, value]) => (
//                     <div key={key}>
//                       <span className="text-sky-600">
//                         {key
//                           .replace(/([A-Z])/g, " $1")
//                           .replace(/^./, (str) => str.toUpperCase())}
//                         :
//                       </span>
//                       <span className="font-medium"> {value} kg</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalculatorPage;
///////////////

"use client";

import React, { useState } from "react";
import { calculateEnvironmentalImpact } from "./calculationUtils";
import { ChevronDown } from "lucide-react";

const CalculatorPage = () => {
  const [foodWaste, setFoodWaste] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    const wasteAmount = parseFloat(foodWaste);
    if (isNaN(wasteAmount) || wasteAmount <= 0) {
      setError("Please enter a valid amount of food waste");
      setResults(null);
      return;
    }
    setError("");
    const impact = calculateEnvironmentalImpact(wasteAmount);
    setResults(impact);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full flex">
        {/* Left panel */}
        <div className="w-1/2 bg-gray-50 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-orange-400">Environmental</span>
              <br />
              <span className="text-navy-800">Impact Calculator</span>
            </h1>
          </div>
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 bg-sky-200 rounded-full"></div>
            <div className="absolute inset-4 bg-sky-400 rounded-2xl transform rotate-12"></div>
            <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 rounded-full shadow-lg"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 bg-yellow-400 rounded-full shadow-lg"></div>
          </div>
          {results && (
            <div className="mt-4 text-sm text-gray-600 bg-white p-4 rounded-xl">
              <p>
                By recycling {results.wasteReduced} kg of food waste, you've
                made a significant environmental impact!
              </p>
              <p>
                You've helped produce {results.fertilizerProduced} kg of
                fertilizer and reduced total CO2 emissions by{" "}
                {results.totalCO2Reduced} kg.
              </p>
              <p>
                This includes avoiding {results.landfillEmissionsAvoided} kg of
                landfill emissions and reducing{" "}
                {results.recyclingEmissionsReduced} kg through recycling.
              </p>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="w-1/2 bg-sky-200 p-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sky-800">Calculate</span>
              <div className="relative">
                <select className="appearance-none bg-white rounded-md py-2 px-4 pr-8 shadow-sm text-sky-800">
                  <option>The final amount</option>
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-800"
                  size={20}
                />
              </div>
            </div>

            <div className="flex items-center">
              <span className="w-1/3 text-sky-800">Food waste</span>
              <div className="w-2/3 flex">
                <input
                  type="number"
                  value={foodWaste}
                  onChange={(e) => setFoodWaste(e.target.value)}
                  className="flex-grow bg-white rounded-l-md py-2 px-4 shadow-sm"
                  placeholder="Enter amount"
                />
                <select className="bg-white rounded-r-md py-2 px-2 shadow-sm border-l text-sky-800">
                  <option>kg</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-orange-400 text-white py-3 rounded-md hover:bg-orange-500 transition-colors duration-200"
            >
              CALCULATE
            </button>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            {results && (
              <div className="bg-white rounded-md p-4 shadow-sm">
                <h2 className="text-lg font-semibold text-sky-800 mb-2">
                  Environmental Impact:
                </h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(results).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-sky-600">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        :
                      </span>
                      <span className="font-medium"> {value} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
