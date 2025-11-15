export const metadata = {
  title:
    "chatbot | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/chatbot",
    title: "chatbot | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for aspirants.",
    siteName: "NEET720",
  },
};

import Chatbot from '@/components/chatbot_front/chatbot'
import React from 'react'



export default function page(){
    return(
        <div>
            <Chatbot/>
        </div>
    )
}