const transactions = [
  { name: "Amazon Purchase", amount: "-₹1,234", time: "2 hours ago", type: "expense" },
  { name: "Salary Credit", amount: "+₹45,000", time: "1 day ago", type: "income" },
  { name: "Netflix Subscription", amount: "-₹649", time: "2 days ago", type: "expense" },
  { name: "Transfer from John", amount: "+₹2,500", time: "3 days ago", type: "income" },
  { name: "Grocery Store", amount: "-₹892", time: "4 days ago", type: "expense" },
];

export const RecentTransactions = () => (
  <div className="bg-gray-50 rounded-xl shadow border">
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
    </div>
    <div className="divide-y">
      {transactions.map((transaction, index) => (
        <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-100">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
              {transaction.type === 'income' ? (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              ) : (
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{transaction.name}</p>
              <p className="text-xs text-gray-500">{transaction.time}</p>
            </div>
          </div>
          <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{transaction.amount}</span>
        </div>
      ))}
    </div>
    <div className="p-4 border-t">
      <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium">View All Transactions</button>
    </div>
  </div>
);
