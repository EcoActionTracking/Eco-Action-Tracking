// "use client";

// import React, { createContext, useState, useContext, useEffect } from "react";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notification, setNotification] = useState(null);

//   const fetchNotification = async () => {
//     try {
//       const response = await fetch("/api/notifications");
//       const data = await response.json();
//       console.log("Fetched notification data:", data);
//       if (data.length > 0 && data[0].challenge) {
//         setNotification(data[0]);
//       } else {
//         setNotification(null);
//       }
//     } catch (error) {
//       console.error("Failed to fetch notification:", error);
//     }
//   };

//   const dismissNotification = async (id) => {
//     try {
//       await fetch("/api/notifications", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id }),
//       });
//       setNotification(null);
//     } catch (error) {
//       console.error("Failed to dismiss notification:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNotification();
//     const interval = setInterval(fetchNotification, 60000); // Fetch every minute
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <NotificationContext.Provider value={{ notification, dismissNotification }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => useContext(NotificationContext);
/////////////
///////////////////////
//////////
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const fetchNotification = async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      if (data.length > 0 && data[0].challenge) {
        setNotification(data[0]);
      } else {
        setNotification(null);
      }
    } catch (error) {
      console.error("Failed to fetch notification:", error);
    }
  };

  const dismissNotification = async () => {
    setNotification(null);
    // We don't need to call the API to mark as read anymore
  };

  useEffect(() => {
    fetchNotification();
    const interval = setInterval(fetchNotification, 60000); // Fetch every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, dismissNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
