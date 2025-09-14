import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useBalance = () => {
  const [balance, setBalance] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/account/balance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBalance(response.data.balance);
      setError("");
    } catch (err: any) {
      setError("Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, error, refetch: fetchBalance };
};
