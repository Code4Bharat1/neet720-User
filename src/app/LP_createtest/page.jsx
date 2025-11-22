import CreateTestPage from "@/components/LP_createtest/createtest";

export const metadata = {
  title:
    "LP_createtest | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/LP_createtest",
    title: "LP_createtest | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import CreateTestPage from "@/components/LP_createtest/createtest";


// const CreateTestPage = () => (
//   <div>
//     <h2>Create Test Page</h2>
//     {/* Add your test creation UI here */}
//   </div>
// );

// export default function page() {
//   return (
//     <div>
//       <CreateTestPage />
//     </div>
//   );
// }



export default function page() {
  return (
    <div>
  
     <CreateTestPage/>
    
    </div>
  );
}
