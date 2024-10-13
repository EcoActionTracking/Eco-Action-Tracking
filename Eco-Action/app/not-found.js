// import Link from "next/link";
// import React from "react";

// function NotFoundPage() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="text-center px-4">
//         <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
//         <h2 className="text-3xl font-semibold text-gray-700 mb-6">
//           Page Not Found
//         </h2>
//         <p className="text-gray-600 mb-8 max-w-md mx-auto">
//           Sorry, the page you are looking for doesn't exist or has been moved.
//         </p>
//         <Link href="/">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//             Return to Homepage
//           </button>
//         </Link>
//       </div>

//       {/* Decorative elements */}
//       <div className="mt-12 text-gray-400">
//         <div className="inline-block border-t-2 border-gray-300 w-8 mx-2"></div>
//         <span>404</span>
//         <div className="inline-block border-t-2 border-gray-300 w-8 mx-2"></div>
//       </div>
//     </div>
//   );
// }

// export default NotFoundPage;
////////////////////////////////////////
import Link from "next/link";
import React from "react";
import { Leaf, Recycle, TreeDeciduous } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
      <div className="text-center px-4 max-w-md">
        <div className="mb-8 flex justify-center space-x-4">
          <Leaf className="text-green-500 w-16 h-16" />
          <TreeDeciduous className="text-green-600 w-16 h-16" />
          <Recycle className="text-green-400 w-16 h-16" />
        </div>
        <h1 className="text-6xl font-bold text-green-800 mb-4">Oops!</h1>
        <h2 className="text-3xl font-semibold text-green-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-green-600 mb-8">
          Sorry, the page you're looking for seems to have been recycled. Let's
          find you a sustainable path forward.
        </p>
        <Link href="/">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-md">
            Return to Eco Hub
          </button>
        </Link>
      </div>

      {/* Eco-friendly tip */}
      <div className="mt-12 text-green-600 max-w-sm text-center px-4">
        <h3 className="font-semibold mb-2">Eco Tip:</h3>
        <p className="text-sm">
          While this page is lost, let's not lose sight of our environment.
          Remember to reduce, reuse, and recycle in your daily life!
        </p>
      </div>

      {/* Decorative elements */}
      <div className="mt-8 text-green-400 flex items-center">
        <div className="border-t-2 border-green-300 w-16"></div>
        <Leaf className="mx-4 w-6 h-6" />
        <div className="border-t-2 border-green-300 w-16"></div>
      </div>
    </div>
  );
}

export default NotFoundPage;
