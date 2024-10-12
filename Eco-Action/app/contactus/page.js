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
//       <div className="bg-green-900 text-white py-16">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
//           <p className="text-xl text-green-100 max-w-2xl">
//             We're here to help and answer any questions you might have. We look
//             forward to hearing from you.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
//             <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label
//                     htmlFor="firstName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
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
//                     className="block text-sm font-medium text-gray-700 mb-1"
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
//                   className="block text-sm font-medium text-gray-700 mb-1"
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
//                   className="block text-sm font-medium text-gray-700 mb-1"
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
//             <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
//               <h2 className="text-2xl font-semibold mb-6">
//                 Contact Information
//               </h2>
//               <div className="space-y-4">
//                 <ContactItem
//                   icon={<Phone className="h-6 w-6" />}
//                   title="Phone"
//                   content="+1 (555) 123-4567"
//                 />
//                 <ContactItem
//                   icon={<Mail className="h-6 w-6" />}
//                   title="Email"
//                   content="support@ecofriendly.com"
//                 />
//                 <ContactItem
//                   icon={<MapPin className="h-6 w-6" />}
//                   title="Address"
//                   content="123 Green Street, Eco City, EC 12345"
//                 />
//                 <ContactItem
//                   icon={<Clock className="h-6 w-6" />}
//                   title="Business Hours"
//                   content="Monday - Friday: 9am - 5pm"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="bg-white py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Frequently Asked Questions
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
//       <div className="flex-shrink-0 h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-4">
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
//     <div className="border-l-4 border-green-500 pl-4">
//       <h3 className="text-lg font-medium text-gray-900 mb-2">{question}</h3>
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
//       <div className="bg-sky-400 text-white py-16">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
//           <p className="text-xl text-white max-w-2xl">
//             Do you need more information? Please contact us to find more about
//             our products and services.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-3">
//             {/* Contact Form */}
//             <div className="col-span-2 p-8">
//               <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
//             <div className="bg-sky-500 text-white p-8">
//               <h2 className="text-2xl font-semibold mb-6">
//                 Contact information
//               </h2>
//               <div className="space-y-4">
//                 <ContactItem
//                   icon={<MapPin className="h-6 w-6" />}
//                   content="345 Street 2, Bucharest"
//                 />
//                 <ContactItem
//                   icon={<Phone className="h-6 w-6" />}
//                   content="+16(3412) 421 241"
//                 />
//                 <ContactItem
//                   icon={<Mail className="h-6 w-6" />}
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
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
//           <p className="text-xl text-[#7AB2B2] max-w-2xl">
//             Do you need more information? Please contact us to find more about
//             our products and services.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-3">
//             {/* Contact Form */}
//             <div className="col-span-2 p-6">
//               <h2 className="text-2xl font-semibold mb-6 text-[#4D869C]">
//                 Send us a message
//               </h2>
//               <form onSubmit={handleSubmit} className="max-w-2xl">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
//               <h2 className="text-2xl font-semibold mb-6">
//                 Contact information
//               </h2>
//               <div className="space-y-4">
//                 <ContactItem
//                   icon={<MapPin className="h-5 w-5" />}
//                   content="345 Street 2, Jordan"
//                 />
//                 <ContactItem
//                   icon={<Phone className="h-5 w-5" />}
//                   content="+962786544235"
//                 />
//                 <ContactItem
//                   icon={<Mail className="h-5 w-5" />}
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
    <div className="min-h-screen bg-[#CDE8E5]">
      {/* Hero Section */}
      <div className="bg-[#CDE8E5] text-[#4D869C] py-3">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-[#7AB2B2] max-w-2xl">
            Do you need more information? Please contact us to find more about
            our products and services.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-[#EEF7FF] rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Contact Form */}
            <div className="col-span-2 p-6">
              <h2 className="text-2xl font-semibold mb-6 text-[#4D869C]">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    className="w-full px-3 py-2 border border-[#CDE8E5] rounded-md focus:ring-2 focus:ring-[#7AB2B2] focus:border-transparent"
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
                      : "hover:bg-[#7AB2B2]"
                  } transition-colors font-medium`}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-[#4D869C] text-white p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Contact information
              </h2>
              <div className="space-y-4">
                <ContactItem
                  icon={<MapPin className="h-5 w-5" />}
                  content="345 Street 2, Jordan"
                />
                <ContactItem
                  icon={<Phone className="h-5 w-5" />}
                  content="+962786544235"
                />
                <ContactItem
                  icon={<Mail className="h-5 w-5" />}
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
