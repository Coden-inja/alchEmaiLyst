import React, { useState } from "react";
import { isValidEmail } from "@/lib/utils";

interface Props {
  onCompose: (data: { recipient: string; subject: string; content: string; persona: string }) => void;
}

const ComposeEmail: React.FC<Props> = ({ onCompose }) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [persona, setPersona] = useState("default");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(recipient)) {
      alert("❌ Please enter a valid email address");
      return;
    }

    if (!recipient || !subject || !content) return;

    onCompose({ recipient, subject, content, persona });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Recipient Email"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Compose your email..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
    </form>
  );
};

export default ComposeEmail;
