import Link from "next/link";
export default function HeroSection(){


    return(
      <main >
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white h-[41rem]" >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              `url("https://i.pinimg.com/564x/71/d3/66/71d366cee67cbe14aade82a35ca6b05b.jpg")`
          }}
        ></div>

        <div className="container relative z-10 px-4 py-24 mx-auto md:py-32">
          <div className="flex flex-col items-center justify-between md:flex-row">
            {/* Left Side: Company Info */}
            <div className="w-full mb-12 md:w-1/2 md:mb-0">
              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              Natural fertilizer.<br />Natural resources.<br />Succeed.
              </h1>
              <p className="mb-8 text-xl text-gray-300">
              Compost acts as a natural fertilizer, boosting soil health and increasing its nutrient content.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link
                  href="/eco-challenges"
                  className="px-8 py-3 font-semibold text-center text-blue-900 transition duration-300 bg-white rounded-full hover:bg-blue-100"
                >
                  Get challenge
                </Link>
                <a
                  href="#"
                  className="px-8 py-3 font-semibold text-center text-white transition duration-300 border-2 border-white rounded-full hover:bg-white hover:text-blue-900"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Side: Features */}
            <div className="w-full md:w-1/2 md:pl-12">
              <div className="p-8 bg-white shadow-2xl bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl">
                <h2 className="mb-6 text-2xl font-semibold">Why should we compost excess food?</h2>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    <span>Decreases methane emissions</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span>Enriches soil</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      ></path>
                    </svg>
                    <span>Supports sustainability</span>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>
    </main>
    );
}