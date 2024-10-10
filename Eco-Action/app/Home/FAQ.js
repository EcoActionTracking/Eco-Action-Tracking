"use client";
import { useState } from "react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="font-[sans-serif] space-y-4 max-w-6xl mx-auto my-40">
      <h2 className="text-3xl font-extrabold text-[#116A7B] mb-8">FAQS</h2>
      
      {faqData.map((faq, index) => (
        <div key={index} className="transition-all rounded-lg hover:bg-[#C2DEDC]">
          <button
            className="w-full text-base font-semibold text-left py-5 px-3 text-[#333] flex items-center"
            type="button"
            onClick={() => toggleFAQ(index)}
          >
            <span className="mr-1">{faq.question}</span>
            <svg
              className={`w-4 ml-auto fill-current shrink-0 transform ${
                openIndex === index ? "rotate-180" : "-rotate-90"
              }`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                data-original="#000000"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <div className={`px-6 pb-5 ${openIndex === index ? "block" : "hidden"}`}>
            <p className="text-sm text-[#333]">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const faqData = [
    {
      question: "How can manure management improve soil health?",
      answer: "Proper manure management enriches soil with nutrients, enhances microbial activity, and improves soil structure, which can lead to increased crop yields and reduced need for chemical fertilizers.",
    },
    {
      question: "What practices can help in effective manure management?",
      answer: "Practices such as composting, using cover crops, and rotational grazing can optimize manure application, minimize nutrient runoff, and improve water quality.",
    },
    {
      question: "Is manure a sustainable fertilizer option?",
      answer: "Yes, manure is a renewable resource that recycles nutrients back into the soil, promoting sustainability and reducing reliance on synthetic fertilizers.",
    },
    {
      question: "How does improper manure management affect the environment?",
      answer: "Improper management can lead to nutrient runoff, which contaminates water bodies and contributes to eutrophication, harming aquatic ecosystems.",
    },
    {
      question: "What are the regulations regarding manure application?",
      answer: "Regulations vary by region but often include guidelines on application rates, timing, and methods to ensure environmental protection and public health.",
    },
  ];
