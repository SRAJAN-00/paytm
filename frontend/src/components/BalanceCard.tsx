interface BalanceCardProps {
  balance: string;
}

export const BalanceCard = ({ balance }: BalanceCardProps) => (
  <div className="bg-white rounded-xl p-6 flex items-center justify-between shadow-md border mb-8">
    <div>
      <p className="text-sm text-gray-500 font-medium mb-2">Total Balance</p>
      <h3 className="text-3xl font-bold text-blue-700">
        {balance ? `₹${balance}` : <span className="animate-pulse text-gray-400">Loading...</span>}
      </h3>
      <p className="text-xs text-gray-400 mt-2">**** **** **** 1234</p>
    </div>
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
      <svg
        className="w-7 h-7 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
  </div>
);
