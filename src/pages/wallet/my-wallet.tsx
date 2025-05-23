import React, { useState } from "react";
import axios from "axios";

type Props = {}

const MyWallet = (props: Props) => {
  const [balance, setBalance] = useState<number>(1000); // Sample starting balance
  const [amount, setAmount] = useState<number>(0);
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleWithdraw = async () => {
    setMessage("");
    if (amount <= 0 || amount > balance) {
      setMessage("Invalid withdrawal amount.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/user/withdraw", {
        amount,
        ...bankDetails,
      });

      if (res.data.success) {
        setBalance((prev) => prev - amount);
        setMessage("✅ Withdrawal successful.");
      } else {
        setMessage("❌ Withdrawal failed: " + res.data.message);
      }
    } catch (err: any) {
      console.error("Withdraw error:", err.response?.data || err.message);
      setMessage("❌ Server error. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10">
      <h1 className="text-2xl font-bold mb-4">Wallet Balance: ₹{balance}</h1>
      
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Amount to Withdraw</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Account Holder Name</label>
        <input
          type="text"
          value={bankDetails.accountHolder}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, accountHolder: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Account Number</label>
        <input
          type="text"
          value={bankDetails.accountNumber}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, accountNumber: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">IFSC Code</label>
        <input
          type="text"
          value={bankDetails.ifscCode}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, ifscCode: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        onClick={handleWithdraw}
        disabled={isLoading}
        className={`w-full py-2 rounded text-white ${
          isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Processing..." : "Withdraw"}
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-red-600">{message}</p>
      )}
    </div>
  );
};

export default MyWallet;
