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
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-sm font-bold">New Challenge</h3>
//           <p className="mt-1 text-xs">{notification.challenge.title}</p>
//         </div>
//         <button
//           onClick={handleDismiss}
//           className="px-2 py-1 text-xs text-blue-500 transition-colors duration-200 bg-white rounded-full hover:bg-blue-100"
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
import { usePathname } from "next/navigation";

const NotificationAlert = () => {
  const { notification, dismissNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();
  const isAuth = pathName.startsWith("/admin");
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
  if (isAuth) return null;

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 bg-[#edf5f7] border-2 border-[#116A7B] text-[#116A7B] p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
      style={{ maxWidth: "90%", width: "350px" }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Leaf className="w-6 h-6 text-[#116A7B]" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">New Eco Challenge</h3>
          <p className="mt-1 text-xs">{notification.challenge.title}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 text-[#116A7B] transition-colors duration-200 bg-[#99cad6] rounded-full hover:bg-[#74969e]"
          aria-label="Close notification"
        >
          <svg
            className="w-4 h-4"
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
