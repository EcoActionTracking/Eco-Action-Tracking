"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CarbonFootprintReduction = () => {
  return (
    <div className="flex flex-col items-center justify-between max-w-6xl p-8 mx-auto md:flex-row">
      <div className="mb-8 md:w-1/2 md:mb-0">
        <h2 className="mb-4 text-3xl font-bold text-green-900">
          Reduce your carbon footprint with Gold Standard
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          certified carbon credits – take the next step toward a cleaner world.
        </p>
        <Button
          variant="default"
          className="text-white bg-green-700 hover:bg-green-800"
        >
          Learn More
        </Button>
      </div>
      <div className="md:w-1/2">
        <div className="relative w-full h-0 pb-[84.28%] rounded-full overflow-hidden bg-yellow-300">
          <Image
            src="https://media.giphy.com/media/3o7TKMyQ7Owmbv9nZm/giphy.gif"
            alt="Woman using biogas system"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintReduction; 