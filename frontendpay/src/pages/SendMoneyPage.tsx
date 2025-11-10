import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useBalance } from "../hooks/useBalance";
import Toast from "../components/Toast";
import { PinInput } from "../components/pinGenration";


export const SendMoneyPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const [showBalance, setShowBalance] = useState(false);
  const { balance, loading, error, refetch } = useBalance();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setToast({ show: true, message: "Please enter a valid amount.", type: "error" });
      return;
    }
    setShowPinInput(true);
    setPinError("");
  };

  const handlePinComplete = async (pin: string) => {
    setPinLoading(true);
    setPinError("");
    
    try {
      await axios.post(
        `${BACKEND_URL}/account/transfer`,
        {
          toUserId: id,
          amount,
          pin, // Send PIN for verification
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      
      setShowPinInput(false);
      setToast({
        show: true,
        message: "Money sent successfully!",
        type: "success",
      });
      refetch(); // Refetch balance after sending money
      setAmount(0); // Reset amount
      setShowBalance(false);
    } catch (error: any) {
      setPinError(error.response?.data?.message || "Invalid PIN or transaction failed");
    } finally {
      setPinLoading(false);
    }
  };

  const handlePinCancel = () => {
    setShowPinInput(false);
    setPinError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      
      <PinInput
        isVisible={showPinInput}
        onComplete={handlePinComplete}
        onCancel={handlePinCancel}
        loading={pinLoading}
        error={pinError}
      />

      <div className="bg-neutral-50 rounded-2xl border shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Send Money
        </h2>
        
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <h1 className="flex font-semibold text-gray-800 mb-1">
              Making payment to: {name}
            </h1>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              value={amount || ""}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setShowBalance(false);
              }}
              type="number"
              className="w-full border rounded-full px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter amount"
              min={1}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-full shadow-sm transition-all duration-200"
          >
            Continue to PIN
          </button>
        </form>
        
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium shadow"
            onClick={() => {
              setShowBalance(true);
              refetch();
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
                : `Your Balance: ₹ ${Number(balance).toFixed(2)}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
