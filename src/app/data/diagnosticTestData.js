// diagnosticTestData.js

// Example Test Data (Add all your 30 categories here)
export const hematologyTests = [
  { name: "সিপি (টিসি, ডিসি, ইএসআর, এইচবি%)", price: "৪৩২/-" },
  { name: "প্লেটলেট কাউন্ট", price: "১৮০/-" },
  // ... more tests
];

export const serologyTests = [
  { name: "ডেঙ্গু টেস্ট", price: "৫০০/-" },
  { name: "এইচ আই ভি টেস্ট", price: "১২৫০/-" },
  // ... more tests
];

export const hormoneTests = [
  { name: "টি৩ / টি৪ / টিএসএইচ", price: "৩৬৩০/-" },
  { name: "এফটি৩/এফটি৪ (প্রতিটি)", price: "১৪৪০/-" },
  // ... more tests
];

export const normalXrayTests = [
  { name: "12 x 15 ফিল্ম (এডাল্ট)", price: "৩০০/-" },
  { name: "ওপিজি", price: "১৫৫/-" },
  // ... more tests
];

// --- The Main Grouping Structure ---
export const testGroups = [
  {
    groupName: "ক্লিনিক্যাল ল্যাব টেস্ট (Clinical Lab Tests)",
    id: "lab-tests",
    categories: [
      { categoryName: "হেমাটোলজি (Hematology)", tests: hematologyTests },
      { categoryName: "সেরোলজি (Serology)", tests: serologyTests },
      { categoryName: "হরমোন (Hormone)", tests: hormoneTests },
      // Add more Lab categories here (e.g., Biochemistry, Microbiology)
    ],
  },
  {
    groupName: "ইমেজিং ও রেডিওলজি (Imaging & Radiology)",
    id: "imaging",
    categories: [
      { categoryName: "নরমাল এক্স-রে (Normal X-Ray)", tests: normalXrayTests },
      { categoryName: "ডিজিটাল এক্স-রে (Digital X-Ray)", tests: normalXrayTests }, // Use real data
      // Add more Imaging categories here (e.g., CT, MRI, Ultrasound)
    ],
  },
  {
    groupName: "বিশেষ স্ক্রিনিং ও প্যাকেজ (Special Screening)",
    id: "packages",
    categories: [
      { categoryName: "হৃদপিণ্ড ও কার্ডিয়াক পরীক্ষা", tests: serologyTests }, // Use real data
      { categoryName: "ডায়াবেটিস স্ক্রিনিং প্যাকেজ", tests: hematologyTests }, // Use real data
    ],
  },
];