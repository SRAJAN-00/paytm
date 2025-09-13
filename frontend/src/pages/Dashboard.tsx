import { DashboardHeader } from "../components/DashboardHeader";
import { BalanceCard } from "../components/BalanceCard";
import { QuickActions } from "../components/QuickActions";
import { RecentTransactions } from "../components/RecentTransactions";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");
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
    const fetchBalance = async () => {
      const response = await axios.get(`${BACKEND_URL}/account/balance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBalance(response.data.balance);
      console.log("balance data", response.data);
    };
    fetchData();
    fetchBalance();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex items-center justify-center py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-300">
        <div className="mb-8">
          <DashboardHeader name={name || "Loading..."} />
        </div>
        <div className="mb-8">
          <BalanceCard balance={balance} />
        </div>
        <div className="mb-8">
          <QuickActions />
        </div>
        <div>
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};
