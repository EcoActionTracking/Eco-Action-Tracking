// "use client";

// import React, { useEffect, useState } from "react";
// import { useNotification } from "../context/NotificationContext";

// const NotificationAlert = () => {
//   const { notification, dismissNotification } = useNotification();
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     if (notification) {
//       setIsVisible(true);
//     }
//   }, [notification]);

//   if (!notification || !notification.challenge) return null;

//   const handleDismiss = () => {
//     setIsVisible(false);
//     setTimeout(() => {
//       dismissNotification();
//     }, 300); // Delay to allow animation to complete
//   };

//   return (
//     <div
//       className={`fixed top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
//       }`}
//       style={{ maxWidth: "90%", width: "400px" }}
//     >
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="font-bold text-sm">New Challenge</h3>
//           <p className="text-xs mt-1">{notification.challenge.title}</p>
//         </div>
//         <button
//           onClick={handleDismiss}
//           className="bg-white text-blue-500 px-2 py-1 rounded-full text-xs hover:bg-blue-100 transition-colors duration-200"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NotificationAlert;
///////////////////////////////////////////////////////
"use client";

import React, { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext";
import { Leaf } from "lucide-react";

const NotificationAlert = () => {
  const { notification, dismissNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
    }
  }, [notification]);

  if (!notification || !notification.challenge) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      dismissNotification();
    }, 300);
  };

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-50 border-2 border-green-200 text-green-800 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
      style={{ maxWidth: "90%", width: "350px" }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Leaf className="h-6 w-6 text-green-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">New Eco Challenge</h3>
          <p className="text-xs mt-1">{notification.challenge.title}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 bg-green-200 text-green-800 rounded-full p-1 hover:bg-green-300 transition-colors duration-200"
          aria-label="Close notification"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotificationAlert;
