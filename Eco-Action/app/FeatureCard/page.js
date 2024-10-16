"use client";
import Image from "next/image";
import Link from "next/link";

const FeatureCard = () => {
  return (
    <section className="p-8 font-sans bg-green-800">
      <div className="flex flex-col items-center max-w-6xl gap-8 mx-auto md:flex-row">
        <div className="md:w-1/2">
          <div className="relative w-full max-w-md mx-auto aspect-square">
            <Image
              src="https://media.giphy.com/media/3o7TKMyQ7Owmbv9nZm/giphy.gif"
              alt="Vegetables GIF"
              layout="fill"
              objectFit="cover"
              className="transform border-4 border-white rounded-lg rotate-6" // الإمالة هنا
            />
          </div>
        </div>
        <div className="text-white md:w-1/2">
          <h2
            className="mb-4 font-serif text-4xl font-bold"
            style={{ fontFamily: "Permanent Marker, cursive" }}
          >
            WHY IS FOOD WASTED?
          </h2>{" "}
          {/* تغيير نوع الخط هنا */}
          <p className="mb-6 text-xl font-light">
            "Too big", "too wonky", "too many".
            <br />
            Around 40% of all food grown goes to waste,
            <br />
            either left behind on the farm or thrown away at home.
          </p>
          <Link href="/mission" passHref>
            <span className="inline-block px-6 py-3 font-semibold text-green-800 transition duration-300 bg-yellow-500 rounded-lg hover:bg-yellow-400">
              READ MORE ABOUT OUR MISSION
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureCard; 