import { BalanceCard } from "../components/BalanceCard";
import { useBalance } from "../hooks/useBalance";
import axios from "axios";
import { useEffect, useState } from "react";

import { BACKEND_URL } from "../config";
import { UserList } from "../components/userList";
import { DashboardHeader } from "../components/DashboardHeader";

export const Dashboard = () => {
  const [name, setName] = useState("");
  const { balance, loading, error } = useBalance();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BACKEND_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setName(response.data.user.firstName);
      console.log("user data", response.data);
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen  flex items-center justify-center py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-300">
        <div className="mb-8">
          <DashboardHeader name={name || "Loading..."} />
        </div>
        <div className="mb-8">
          <BalanceCard
            balance={loading ? "Loading..." : error ? error : balance}
          />
        </div>
        <div className="mb-8">
          <UserList />
        </div>
      </div>
    </div>
  );
};
