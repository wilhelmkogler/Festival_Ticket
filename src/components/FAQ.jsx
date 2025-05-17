import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqData = [
  {
    question: "How can I buy a festival ticket?",
    answer:
      "Select an event, click the 'Buy Ticket' button, and follow the payment instructions.",
  },
  {
    question: "What payment methods are supported?",
    answer: "We support secure credit/debit card payments via Stripe.",
  },
  {
    question: "Will I receive a confirmation email after purchase?",
    answer:
      "Yes, an automatic confirmation email with your QR-code ticket will be sent after purchase.",
  },
  {
    question: "What if I lose my QR-code ticket?",
    answer:
      "You can always re-download it from your profile or the confirmation email.",
  },
  {
    question: "How many tickets can I buy at once?",
    answer: "You can buy up to 10 tickets in one purchase.",
  },
  {
    question: "Are tickets transferable?",
    answer:
      "Currently, tickets are non-transferable and are tied to your account.",
  },
  {
    question: "Can I get a refund for my ticket?",
    answer: "Tickets are non-refundable unless the event is canceled.",
  },
  {
    question: "What should I do if I didn’t receive an email?",
    answer:
      "Please check your spam folder. If it's not there, contact us via the Contact page.",
  },
  {
    question: "Do you have a mobile app?",
    answer:
      "Currently, we only have a web platform, but it's fully mobile-optimized.",
  },
  {
    question: "Do I need to register to buy tickets?",
    answer:
      "Yes, registration is required to purchase and manage your tickets.",
  },
  {
    question: "How do I use my ticket to enter the festival?",
    answer:
      "At the entrance, show your QR-code ticket on your phone or a printed version.",
  },
  {
    question: "Is the website available in multiple languages?",
    answer:
      "Currently, the site is only available in English, but more languages are coming soon.",
  },
];

function About({ darkMode, toggleDarkMode }) {
  const [openIndexes, setOpenIndexes] = useState([]);


  const toggleFAQ = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // ha benne van, zárjuk be
        : [...prev, index]               // ha nincs benne, nyissuk meg
    );
  };
  

  return (
    <div className="max-w-7xl mx-auto py-6 lg:py-24 px-4">
      <h1 className={`${darkMode ? "text-white" : "text-black"
    } text-3xl lg:text-5xl font-bold mb-10 text-center`}>About FestivalApp</h1>


      <h2 className={`${darkMode ? "text-white" : "text-black"
    } text-xl lg:text-3xl font-semibold mt-20 mb-6 text-center`}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
      {faqData.map((faq, index) => (
  <div
    key={index}
    className={`${
      darkMode ? "bg-transparent text-white" : "bg-white text-black"
    } border-2 border-white rounded-lg overflow-hidden shadow-sm`}
  >
    <button
      onClick={() => toggleFAQ(index)}
      className="w-full flex justify-between items-center px-4 py-4 text-left text-md lg:text-2xl font-medium"
    >
      {faq.question}
      <span>{openIndexes.includes(index) ? "-" : "+"}</span>
    </button>

    <AnimatePresence initial={false}>
      {openIndexes.includes(index) && (
        <motion.section
          key={`content-${index}`}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className={`${
            darkMode ? "bg-transparent text-white" : "bg-white text-black"
          } px-4 pt-0 pb-4 text-md origin-top text-sm`}
        >
          {faq.answer}
        </motion.section>
      )}
    </AnimatePresence>
  </div>
))}

      </div>
    </div>
  );
}

export default About;
