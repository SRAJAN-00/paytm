export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to PayTM Dashboard!
        </h1>
        <p className="text-gray-600">You have successfully signed in.</p>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">
            🚧 Dashboard is under construction. Backend integration coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};
