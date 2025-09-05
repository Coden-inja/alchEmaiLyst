import { isValidEmail } from "@/lib/utils";

// Example API wrapper — keep your existing API calls and just validate
export async function sendEmail(to: string, subject: string, body: string) {
  if (!isValidEmail(to)) {
    throw new Error("❌ Invalid email format");
  }

  // Keep your existing backend/API call here
  return fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, subject, body }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to send email");
    }
    return res.json();
  });
}
