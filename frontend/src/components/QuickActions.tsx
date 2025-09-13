import { useState } from "react";
import { SendMoneyModal } from "./SendMoneyModal";

export const QuickActions = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSend = (recipient: string, amount: number) => {
    // TODO: Add send money logic here
    console.log("Send to:", recipient, "Amount:", amount);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-white p-4 rounded-xl shadow hover:shadow-md border flex flex-col items-center space-y-2"
        >
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <span className="font-medium text-gray-900 text-sm">Send Money</span>
        </button>
        <button className="bg-white p-4 rounded-xl shadow hover:shadow-md border flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          <span className="font-medium text-gray-900 text-sm">
            Request Money
          </span>
        </button>
        <button className="bg-white p-4 rounded-xl shadow hover:shadow-md border flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <span className="font-medium text-gray-900 text-sm">Pay Bills</span>
        </button>
        <button className="bg-white p-4 rounded-xl shadow hover:shadow-md border flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="font-medium text-gray-900 text-sm">Add Money</span>
        </button>
      </div>
      <SendMoneyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSend={handleSend}
      />
    </>
  );
};
