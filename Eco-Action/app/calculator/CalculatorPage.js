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
// //     <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-r from-green-400 to-blue-500 sm:px-6 lg:px-8">
// //       <motion.div
// //         className="w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-2xl"
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.5 }}
// //       >
// //         <div className="px-6 py-8">
// //           <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">
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
// //               className="block mb-2 text-lg font-medium text-gray-700"
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
// //               className="flex items-center p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ delay: 0.3, duration: 0.4 }}
// //             >
// //               <AlertCircle className="w-6 h-6 mr-3" />
// //               <span>{error}</span>
// //             </motion.div>
// //           )}
// //           <motion.button
// //             onClick={handleCalculate}
// //             className="w-full px-6 py-3 text-lg text-white transition-colors duration-300 bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //           >
// //             Calculate Impact
// //           </motion.button>
// //           {results && (
// //             <motion.div
// //               className="p-6 mt-8 border border-green-200 rounded-lg bg-green-50"
// //               initial={{ y: 50, opacity: 0 }}
// //               animate={{ y: 0, opacity: 1 }}
// //               transition={{ delay: 0.4, duration: 0.6 }}
// //             >
// //               <h2 className="mb-4 text-2xl font-semibold text-green-800">
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
// //     <div className="min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
// //       <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
// //         <div className="px-4 py-5 sm:p-6">
// //           <h1 className="mb-6 text-2xl font-bold text-gray-900">
// //             Environmental Impact Calculator
// //           </h1>
// //           <div className="mb-4">
// //             <label
// //               htmlFor="foodWaste"
// //               className="block mb-2 text-sm font-medium text-gray-700"
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
// //             <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
// //               <div className="flex items-center">
// //                 <AlertCircle className="w-5 h-5 mr-2" />
// //                 <span>{error}</span>
// //               </div>
// //             </div>
// //           )}
// //           <button
// //             onClick={handleCalculate}
// //             className="w-full px-4 py-2 text-white transition-colors duration-200 bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
// //           >
// //             Calculate Impact
// //           </button>
// //           {results && (
// //             <div className="p-4 mt-6 border border-green-200 rounded-md bg-green-50">
// //               <h2 className="mb-3 text-lg font-semibold text-green-800">
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
// //     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-50 to-blue-50">
// //       <div className="w-full max-w-md overflow-hidden bg-white shadow-xl rounded-3xl">
// //         <div className="flex items-center justify-between p-6 text-white bg-green-600">
// //           <h1 className="text-2xl font-bold">حاسبة الأثر البيئي</h1>
// //           <Leaf className="w-8 h-8" />
// //         </div>
// //         <div className="p-6">
// //           <div className="mb-6">
// //             <label
// //               htmlFor="foodWaste"
// //               className="block mb-2 text-sm font-medium text-gray-700"
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
// //             <div className="flex items-center p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-full">
// //               <AlertCircle className="w-5 h-5 mr-2" />
// //               <span>{error}</span>
// //             </div>
// //           )}
// //           <button
// //             onClick={handleCalculate}
// //             className="w-full px-4 py-2 text-white transition-colors duration-200 bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
// //           >
// //             حساب الأثر
// //           </button>
// //           {results && (
// //             <div className="p-4 mt-6 border border-green-200 bg-green-50 rounded-2xl">
// //               <h2 className="mb-3 text-lg font-semibold text-green-800">
// //                 الأثر البيئي:
// //               </h2>
// //               <div className="grid grid-cols-2 gap-4 text-right">
// //                 {Object.entries(results).map(([key, value]) => (
// //                   <div key={key} className="p-3 bg-white shadow-sm rounded-xl">
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
// //               <div className="p-4 mt-4 text-sm text-gray-600 bg-white rounded-xl">
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
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-50 to-blue-50">
//       <div className="w-full max-w-md overflow-hidden bg-white shadow-xl rounded-3xl">
//         <div className="flex items-center justify-between p-6 text-white bg-green-600">
//           <h1 className="text-2xl font-bold">
//             Environmental Impact Calculator
//           </h1>
//           <Leaf className="w-8 h-8" />
//         </div>
//         <div className="p-6">
//           <div className="mb-6">
//             <label
//               htmlFor="foodWaste"
//               className="block mb-2 text-sm font-medium text-gray-700"
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
//             <div className="flex items-center p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-full">
//               <AlertCircle className="w-5 h-5 mr-2" />
//               <span>{error}</span>
//             </div>
//           )}
//           <button
//             onClick={handleCalculate}
//             className="w-full px-4 py-2 text-white transition-colors duration-200 bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//           >
//             Calculate Impact
//           </button>
//           {results && (
//             <div className="p-4 mt-6 border border-green-200 bg-green-50 rounded-2xl">
//               <h2 className="mb-3 text-lg font-semibold text-green-800">
//                 Environmental Impact:
//               </h2>
//               <div className="grid grid-cols-2 gap-4">
//                 {Object.entries(results).map(([key, value]) => (
//                   <div key={key} className="p-3 bg-white shadow-sm rounded-xl">
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
//               <div className="p-4 mt-4 text-sm text-gray-600 bg-white rounded-xl">
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
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
//       <div className="flex w-full max-w-4xl overflow-hidden bg-white shadow-xl rounded-3xl">
//         {/* Left panel */}
//         <div className="flex flex-col justify-between w-1/2 p-8 bg-gray-50">
//           <div>
//             <h1 className="mb-2 text-4xl font-bold">
//               <span className="text-orange-400">Environmental</span>
//               <br />
//               <span className="text-navy-800">Impact Calculator</span>
//             </h1>
//           </div>
//           <div className="relative w-48 h-48 mx-auto">
//             <div className="absolute inset-0 rounded-full bg-sky-200"></div>
//             <div className="absolute transform inset-4 bg-sky-400 rounded-2xl rotate-12"></div>
//             <div className="absolute w-16 h-16 bg-yellow-400 rounded-full shadow-lg top-4 left-4"></div>
//             <div className="absolute w-16 h-16 bg-yellow-400 rounded-full shadow-lg bottom-4 right-4"></div>
//           </div>
//         </div>

//         {/* Right panel */}
//         <div className="w-1/2 p-8 bg-sky-200">
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="text-white">Calculate</span>
//               <div className="relative">
//                 <select className="px-4 py-2 pr-8 text-white bg-white rounded-md shadow-sm appearance-none">
//                   <option>The final amount</option>
//                 </select>
//                 <ChevronDown
//                   className="absolute text-white transform -translate-y-1/2 right-2 top-1/2"
//                   size={20}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center">
//               <span className="w-1/3 text-white">Food waste</span>
//               <div className="flex w-2/3">
//                 <input
//                   type="number"
//                   value={foodWaste}
//                   onChange={(e) => setFoodWaste(e.target.value)}
//                   className="flex-grow px-4 py-2 bg-white shadow-sm rounded-l-md"
//                   placeholder="Enter amount"
//                 />
//                 <select className="px-2 py-2 text-white bg-white border-l shadow-sm rounded-r-md">
//                   <option>kg</option>
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={handleCalculate}
//               className="w-full py-3 text-white transition-colors duration-200 bg-orange-400 rounded-md hover:bg-orange-500"
//             >
//               CALCULATE
//             </button>

//             {error && <div className="text-sm text-red-600">{error}</div>}

//             {results && (
//               <div className="p-4 bg-white rounded-md shadow-sm">
//                 <h2 className="mb-2 text-lg font-semibold text-white">
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
    <div className="flex items-center justify-center p-4 ">
      <div className="flex w-full max-w-4xl overflow-hidden bg-white shadow-xl rounded-3xl">
        {/* Left panel */}
        <div className="flex flex-col justify-between w-1/2 p-8 bg-gray-50 ">
          <div>
            <h1 className="mb-2 text-4xl font-bold">
              <span className="text-[#116A7B]">Environmental</span>
              <br />
              <span className="text-navy-800">Impact Calculator</span>
            </h1>
          </div>
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 rounded-full bg-sky-200"></div>
            <div className="absolute transform inset-4 bg-[#116A7B] rounded-2xl rotate-12"></div>
            <div className="absolute w-16 h-16 bg-gradient-to-r from-[#5f99a5] to-[#B2EBF2] rounded-full shadow-lg top-4 left-4"></div>
            <div className="absolute w-16 h-16 bg-gradient-to-r from-[#5f99a5] to-[#B2EBF2] rounded-full shadow-lg bottom-4 right-4"></div>
          </div>
          {results && (
            <div className="p-4 mt-4 text-sm text-gray-600 bg-white rounded-xl">
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
        <div className="w-1/2 p-8 bg-[#116A7B] ">
          <div className="space-y-4">
        

            <div className="flex items-center mt-20 pe-20">
              <span className="w-1/3 text-white">Food waste</span>
              <div className="flex w-2/3">
                <input
                  type="number"
                  value={foodWaste}
                  onChange={(e) => setFoodWaste(e.target.value)}
                  className="flex-grow px-4 py-2 bg-white shadow-sm rounded-l-md"
                  placeholder="Enter amount"
                />
                <select className="px-2 py-2 text-[#12393e] bg-white border-l shadow-sm rounded-r-md">
                  <option>kg</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-3 text-white transition-colors duration-200 bg-gradient-to-r from-[#5f99a5] to-[#B2EBF2] rounded-md hover:text-[#116A7B]"
            >
              CALCULATE
            </button>

            {error && <div className="text-sm text-red-600">{error}</div>}

            {results && (
              <div className="p-4 bg-white rounded-md shadow-sm">
                <h2 className="mb-2 text-lg font-semibold text-white">
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
