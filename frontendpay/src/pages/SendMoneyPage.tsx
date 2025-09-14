import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import Toast from "../components/Toast";
import { useBalance } from "../hooks/useBalance";

export const SendMoneyPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const [showBalance, setShowBalance] = useState(false);
  const { balance, loading, error, refetch } = useBalance();

  const sendmoney = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BACKEND_URL}/account/transfer`,
        {
          toUserId: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setToast({
        show: true,
        message: "Money sent successfully!",
        type: "success",
      });
      refetch(); // Refetch balance after sending money
    } catch (error) {
      setToast({ show: true, message: "Failed to send money.", type: "error" });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="bg-neutral-50 rounded-2xl border shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Send Money
        </h2>
        <form className="space-y-6" onSubmit={sendmoney}>
          <div>
            <h1 className="flex font-semi-bold text-gray-800 mb-1">
              Making payment to:{name}
            </h1>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setShowBalance(false);
              }}
              type="number"
              className="w-full border rounded-full px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter amount"
              min={1}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-full shadow-sm transition-all duration-200"
          >
            Send
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium shadow"
            onClick={() => {
              setShowBalance(true);
              refetch(); // Refetch balance when checking
            }}
          >
            Check Balance
          </button>
          {showBalance && (
            <div className="mt-2 text-lg font-bold text-blue-700">
              {loading
                ? "Loading..."
                : error
                ? error
                : `Your Balance: ₹ ${Number(balance).toFixed(3)}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
