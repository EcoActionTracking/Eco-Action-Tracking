import CalculatorPage from "../calculator/CalculatorPage";

export function CalculatorHome() {
    return (
        // <section className="py-24">
        //     <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        //         <div className="text-center mb-14">
        //             <h2 className="py-5 text-4xl font-bold text-center text-[#116A7B]">
        //                 Transforming Waste into Resources
        //             </h2>
        //             <p className="max-w-md mx-auto text-lg font-normal text-gray-500 md:max-w-2xl">
        //                 We can change the environment by our wasted food. By converting wasted food into manure, we can significantly impact our planet. Enter your wasted food in kg to calculate the total CO2 reduced, waste reduced, landfill emissions avoided, recycling emissions reduced, fertilizer produced, and CO2 reduced from fertilizer.
        //             </p>
        //         </div>
        //     </div>
        // </section>


<div className="bg-white px-6 py-12 w-full rounded font-[sans-serif] my-20">
  <div className="max-w-6xl mx-auto text-center">
    <h1 className="text-3xl font-extrabold text-[#116A7B] sm:text-4xl">Transforming Waste into Resources</h1>
    <div className="my-10">
      <p className="text-sm text-[#5b6466]">
      We can change the environment by our wasted food. By converting wasted food into manure, we can significantly impact our planet. Enter your wasted food in kg to calculate the total CO2 reduced, waste reduced, landfill emissions avoided, recycling emissions reduced, fertilizer produced, and CO2 reduced from fertilizer.

      </p>
    </div>

    <hr className="border-gray-600" />

    <div className="flex justify-center gap-4 mt-10 max-sm:flex-col sm:gap-6">
      <CalculatorPage/>
    </div>
  </div>
</div>

    );
}
