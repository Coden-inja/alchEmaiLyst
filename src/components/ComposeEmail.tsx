import { useState } from "react";
import { isValidEmail } from "@/lib/utils";

export default function ComposeEmail() {
  const [to, setTo] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSend = () => {
    if (!isValidEmail(to)) {
      setError("❌ Please enter a valid email address");
      return;
    }

    setError("");
    console.log("Sending email to:", to);
    // TODO: call API to send email
  };

  return (
    <div>
      <input
        type="email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Recipient Email"
        className="border p-2 rounded w-full"
      />
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleSend}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
