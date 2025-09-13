import { Button } from "./Button";

interface DashboardHeaderProps {
  name: string;
}

export const DashboardHeader = ({ name }: DashboardHeaderProps) => (
  <div className="flex items-center justify-between mb-8 gap-4">
    <div className="flex items-center space-x-4 min-w-0">
      <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <div className="truncate max-w-xs">
        <h2 className="text-2xl font-bold text-blue-700 truncate">
          Welcome, {name}
        </h2>
        <p className="text-sm text-gray-500 truncate">
          Your PayTM Dashboard
        </p>
      </div>
    </div>
    <Button
      size="medium"
      className="ml-4 flex-shrink-0"
      onClick={() => {
        window.location.href = "/signin";
        localStorage.removeItem("token");
      }}
    >
      Logout
    </Button>
  </div>
);
