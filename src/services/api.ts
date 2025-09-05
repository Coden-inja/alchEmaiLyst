import { isValidEmail } from "@/lib/utils";

export async function sendEmail(to: string, subject: string, body: string) {
  if (!isValidEmail(to)) {
    throw new Error("Invalid email format");
  }

  // Mock API call
  return { success: true, message: `Email sent to ${to}` };
}
