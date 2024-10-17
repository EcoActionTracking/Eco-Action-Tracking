// "use client";

// import React, { useState } from "react";
// import { Phone, Mail, MapPin, Clock } from "lucide-react";
// import Swal from "sweetalert2";

// export default function ContactPage() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ firstName, lastName, email, message }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         Swal.fire(
//           "Success!",
//           "Your message has been sent successfully.",
//           "success"
//         );
//         setFirstName("");
//         setLastName("");
//         setEmail("");
//         setMessage("");
//       } else {
//         Swal.fire("Error!", data.error, "error");
//       }
//     } catch (error) {
//       Swal.fire("Error!", "An error occurred. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="py-16 text-white bg-green-900">
//         <div className="container px-4 mx-auto">
//           <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
//           <p className="max-w-2xl text-xl text-green-100">
//             We're here to help and answer any questions you might have. We look
//             forward to hearing from you.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container px-4 py-12 mx-auto">
//         <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
//           {/* Contact Form */}
//           <div className="p-6 bg-white rounded-lg shadow-lg md:p-8">
//             <h2 className="mb-6 text-2xl font-semibold">Send us a Message</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
//                 <div>
//                   <label
//                     htmlFor="firstName"
//                     className="block mb-1 text-sm font-medium text-gray-700"
//                   >
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     placeholder="John"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="lastName"
//                     className="block mb-1 text-sm font-medium text-gray-700"
//                   >
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     placeholder="Doe"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <label
//                   htmlFor="email"
//                   className="block mb-1 text-sm font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="john@example.com"
//                   required
//                 />
//               </div>
//               <div className="mb-6">
//                 <label
//                   htmlFor="message"
//                   className="block mb-1 text-sm font-medium text-gray-700"
//                 >
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   rows={4}
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="How can we help you?"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className={`w-full bg-green-600 text-white py-2 px-4 rounded-md ${
//                   loading
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-green-700"
//                 } transition-colors font-medium`}
//                 disabled={loading}
//               >
//                 {loading ? "Sending..." : "Send Message"}
//               </button>
//             </form>
//           </div>

//           {/* Contact Information */}
//           <div>
//             <div className="p-6 mb-8 bg-white rounded-lg shadow-lg md:p-8">
//               <h2 className="mb-6 text-2xl font-semibold">
//                 Contact Information
//               </h2>
//               <div className="space-y-4">
//                 <ContactItem
//                   icon={<Phone className="w-6 h-6" />}
//                   title="Phone"
//                   content="+1 (555) 123-4567"
//                 />
//                 <ContactItem
//                   icon={<Mail className="w-6 h-6" />}
//                   title="Email"
//                   content="support@ecofriendly.com"
//                 />
//                 <ContactItem
//                   icon={<MapPin className="w-6 h-6" />}
//                   title="Address"
//                   content="123 Green Street, Eco City, EC 12345"
//                 />
//                 <ContactItem
//                   icon={<Clock className="w-6 h-6" />}
//                   title="Business Hours"
//                   content="Monday - Friday: 9am - 5pm"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="py-12 bg-white">
//         <div className="container px-4 mx-auto">
//           <h2 className="mb-8 text-3xl font-bold text-center">
//             Frequently Asked Questions
//           </h2>
//           <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto md:grid-cols-2">
//             <FAQItem
//               question="What are your customer service hours?"
//               answer="Our customer service team is available Monday through Friday, 9am to 5pm Eastern Time."
//             />
//             <FAQItem
//               question="How long does it take to get a response?"
//               answer="We strive to respond to all inquiries within 24 business hours."
//             />
//             <FAQItem
//               question="Do you offer site visits?"
//               answer="Yes, we offer site visits for commercial clients. Please contact us to schedule an appointment."
//             />
//             <FAQItem
//               question="How can I join your eco-friendly initiatives?"
//               answer="We have various programs for individuals and businesses. Reach out to learn more about our green initiatives."
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ContactItem({ icon, title, content }) {
//   return (
//     <div className="flex items-start">
//       <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 text-green-600 bg-green-100 rounded-lg">
//         {icon}
//       </div>
//       <div>
//         <h3 className="text-lg font-medium text-gray-900">{title}</h3>
//         <p className="text-gray-600">{content}</p>
//       </div>
//     </div>
//   );
// }

// function FAQItem({ question, answer }) {
//   return (
//     <div className="pl-4 border-l-4 border-green-500">
//       <h3 className="mb-2 text-lg font-medium text-gray-900">{question}</h3>
//       <p className="text-gray-600">{answer}</p>
//     </div>
//   );
// }
//////////

// "use client";

// import React, { useState } from "react";
// import { Phone, Mail, MapPin } from "lucide-react";
// import Swal from "sweetalert2";

// export default function ContactPage() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ firstName, lastName, email, message }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         Swal.fire(
//           "Success!",
//           "Your message has been sent successfully.",
//           "success"
//         );
//         setFirstName("");
//         setLastName("");
//         setEmail("");
//         setMessage("");
//       } else {
//         Swal.fire("Error!", data.error, "error");
//       }
//     } catch (error) {
//       Swal.fire("Error!", "An error occurred. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-sky-400">
//       {/* Hero Section */}
//       <div className="py-16 text-white bg-sky-400">
//         <div className="container px-4 mx-auto">
//           <h1 className="mb-4 text-4xl font-bold md:text-5xl">Get in Touch</h1>
//           <p className="max-w-2xl text-xl text-white">
//             Do you need more information? Please contact us to find more about
//             our products and services.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container px-4 py-12 mx-auto">
//         <div className="overflow-hidden bg-white rounded-lg shadow-lg">
//           <div className="grid grid-cols-1 md:grid-cols-3">
//             {/* Contact Form */}
//             <div className="col-span-2 p-8">
//               <h2 className="mb-6 text-2xl font-semibold">Send us a message</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
//                   <div>
//                     <input
//                       type="text"
//                       id="firstName"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                       placeholder="First Name..."
//                       required
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="text"
//                       id="lastName"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                       placeholder="Last Name..."
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-6">
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                     placeholder="Email Here..."
//                     required
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <textarea
//                     id="message"
//                     rows={4}
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                     placeholder="Your message"
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center mb-6">
//                   <input
//                     type="checkbox"
//                     id="notRobot"
//                     className="mr-2"
//                     required
//                   />
//                   <label htmlFor="notRobot" className="text-sm text-gray-600">
//                     I'm not a robot
//                   </label>
//                 </div>
//                 <button
//                   type="submit"
//                   className={`w-full bg-sky-500 text-white py-2 px-4 rounded-md ${
//                     loading
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-sky-600"
//                   } transition-colors font-medium`}
//                   disabled={loading}
//                 >
//                   {loading ? "Sending..." : "SEND MESSAGE"}
//                 </button>
//               </form>
//             </div>

//             {/* Contact Information */}
//             <div className="p-8 text-white bg-sky-500">
//               <h2 className="mb-6 text-2xl font-semibold">
//                 Contact information
//               </h2>
//               <div className="space-y-4">
//                 <ContactItem
//                   icon={<MapPin className="w-6 h-6" />}
//                   content="345 Street 2, Bucharest"
//                 />
//                 <ContactItem
//                   icon={<Phone className="w-6 h-6" />}
//                   content="+16(3412) 421 241"
//                 />
//                 <ContactItem
//                   icon={<Mail className="w-6 h-6" />}
//                   content="contact@yoursite.com"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ContactItem({ icon, content }) {
//   return (
//     <div className="flex items-center">
//       <div className="flex-shrink-0 mr-4">{icon}</div>
//       <p>{content}</p>
//     </div>
//   );
// }
// /////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import React, { useState } from "react";
// import { Phone, Mail, MapPin } from "lucide-react";
// import Swal from "sweetalert2";

// export default function ContactPage() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ firstName, lastName, email, message }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         Swal.fire(
//           "Success!",
//           "Your message has been sent successfully.",
//           "success"
//         );
//         setFirstName("");
//         setLastName("");
//         setEmail("");
//         setMessage("");
//       } else {
//         Swal.fire("Error!", data.error, "error");
//       }
//     } catch (error) {
//       Swal.fire("Error!", "An error occurred. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#CDE8E5]">
//       {/* Hero Section */}
//       <div className="bg-[#CDE8E5] text-[#4D869C] py-3">
//         <div className="container px-4 mx-auto">
//           <h1 className="mb-4 text-4xl font-bold md:text-5xl">Get in Touch</h1>
//           <p className="text-xl text-[#7AB2B2] max-w-2xl">
//             Do you need more information? Please contact us to find more about
//             our products and services.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container px-4 mx-auto">
//         <div className="overflow-hidden bg-white rounded-lg shadow-lg">
//           <div className="grid grid-cols-1 md:grid-cols-3">
//             {/* Contact Form */}
//             <div className="col-span-2 p-6">
//               <h2 className="text-2xl font-semibold mb-6 text-[#4D869C]">
//                 Send us a message
//               </h2>
//               <form onSubmit={handleSubmit} className="max-w-2xl">
//                 <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
//                   <div>
//                     <input
//                       type="text"
//                       id="firstName"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       className="w-full px-3 py-2 border border-[#CDE8E5] rounded-md focus:ring-2 focus:ring-[#7AB2B2] focus:border-transparent"
//                       placeholder="First Name..."
//                       required
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="text"
//                       id="lastName"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       className="w-full px-3 py-2 border border-[#CDE8E5] rounded-md focus:ring-2 focus:ring-[#7AB2B2] focus:border-transparent"
//                       placeholder="Last Name..."
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-3 py-2 border border-[#CDE8E5] rounded-md focus:ring-2 focus:ring-[#7AB2B2] focus:border-transparent"
//                     placeholder="Email Here..."
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <textarea
//                     id="message"
//                     rows={3}
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     className="w-full px-3 py-2 border border-[#CDE8E5] rounded-md focus:ring-2 focus:ring-[#7AB2B2] focus:border-transparent"
//                     placeholder="Your message"
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <input
//                     type="checkbox"
//                     id="notRobot"
//                     className="mr-2"
//                     required
//                   />
//                   <label htmlFor="notRobot" className="text-sm text-[#7AB2B2]">
//                     I'm not a robot
//                   </label>
//                 </div>
//                 <button
//                   type="submit"
//                   className={`w-full bg-[#4D869C] text-white py-2 px-4 rounded-md ${
//                     loading
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-[#7AB2B2]"
//                   } transition-colors font-medium`}
//                   disabled={loading}
//                 >
//                   {loading ? "Sending..." : "SEND MESSAGE"}
//                 </button>
//               </form>
//             </div>

//             {/* Contact Information */}
//             <div className="bg-[#4D869C] text-white p-6">
//               <h2 className="mb-6 text-2xl font-semibold">
//                 Contact information
//               </h2>
//               <div className="space-y-4">
//                 <ContactItem
//                   icon={<MapPin className="w-5 h-5" />}
//                   content="345 Street 2, Jordan"
//                 />
//                 <ContactItem
//                   icon={<Phone className="w-5 h-5" />}
//                   content="+962786544235"
//                 />
//                 <ContactItem
//                   icon={<Mail className="w-5 h-5" />}
//                   content="contact@yoursite.com"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ContactItem({ icon, content }) {
//   return (
//     <div className="flex items-center">
//       <div className="flex-shrink-0 mr-3">{icon}</div>
//       <p>{content}</p>
//     </div>
//   );
// }
////////////////////////////

"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Swal from "sweetalert2";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, message }),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire(
          "Success!",
          "Your message has been sent successfully.",
          "success"
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        Swal.fire("Error!", data.error, "error");
      }
    } catch (error) {
      Swal.fire("Error!", "An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-32">
      {/* Hero Section */}
      <div className=" text-[#116A7B] py-3 text-center my-10">
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-center md:text-5xl">Get in Touch</h1>
          <p className="text-xl text-[#7AB2B2]  text-center">
            Do you need more information? Please contact us to find more about
            our products and services.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 mx-auto">
        <div className="bg-[#EEF7FF] rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Contact Form */}
            <div className="col-span-2 p-6">
              <h2 className="text-2xl font-semibold mb-6 text-[#4D869C]">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-[#CDE8E5] rounded-md focus:ring-2 focus:ring-[#7AB2B2] focus:border-transparent"
                      placeholder="First Name..."
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-[#CDE8E5] rounded-md focus:ring-2 focus:ring-[#7AB2B2] focus:border-transparent"
                      placeholder="Last Name..."
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#CDE8E5] rounded-md focus:ring-2 focus:ring-[#7a9cb2] focus:border-transparent"
                    placeholder="Email Here..."
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-[#CDE8E5] rounded-md focus:ring-2 focus:ring-[#7AB2B2] focus:border-transparent"
                    placeholder="Your message"
                    required
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="notRobot"
                    className="mr-2"
                    required
                  />
                  <label htmlFor="notRobot" className="text-sm text-[#7AB2B2]">
                    I'm not a robot
                  </label>
                </div>
                <button
                  type="submit"
                  className={`w-full bg-[#4D869C] text-white py-2 px-4 rounded-md ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#3a8ca0]"
                  } transition-colors font-medium`}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-[#116A7B] text-white p-6">
              <h2 className="mb-6 text-2xl font-semibold">
                Contact information
              </h2>
              <div className="space-y-4">
                <ContactItem
                  icon={<MapPin className="w-5 h-5" />}
                  content="345 Street 2, Jordan"
                />
                <ContactItem
                  icon={<Phone className="w-5 h-5" />}
                  content="+962786544235"
                />
                <ContactItem
                  icon={<Mail className="w-5 h-5" />}
                  content="contact@yoursite.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, content }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <p>{content}</p>
    </div>
  );
}
