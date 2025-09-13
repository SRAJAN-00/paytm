import React from "react";

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (recipient: string, amount: number) => void;
}

export const SendMoneyModal: React.FC<SendMoneyModalProps> = ({
  isOpen,
  onClose,
  onSend,
}) => {
  const [recipient, setRecipient] = React.useState("");
  const [amount, setAmount] = React.useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4 text-blue-700">Send Money</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (recipient && amount) {
              onSend(recipient, Number(amount));
              setRecipient("");
              setAmount("");
              onClose();
            }
          }}
        >
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Username
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
