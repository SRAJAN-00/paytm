import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

type DashboardHeaderProps = {
  name: string;
};

export const DashboardHeader = ({ name }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold text-blue-700">Welcome, {name}!</h1>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/signin");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
