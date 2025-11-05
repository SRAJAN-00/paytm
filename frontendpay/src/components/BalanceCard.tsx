type BalanceCardProps = {
  balance: string | number;
};

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  return (
    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-md">
      <div>
        <div className="text-lg font-semibold text-blue-700">Your Balance</div>
        <div className="text-3xl font-bold text-blue-900 mt-2">₹ {Number(balance).toFixed(2)}</div>
      </div>
      <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8"
          />
        </svg>
      </div>
    </div>
  );
};
