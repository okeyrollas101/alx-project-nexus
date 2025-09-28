// utils/chapa.ts
import axios from "axios";

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const CHAPA_BASE_URL = "https://api.chapa.co/v1";

// Initiate payment
export async function initiatePayment({
  amount,
  currency = "RWF",
  email,
  firstName,
  lastName,
  callbackUrl,
}: {
  amount: number;
  currency?: string;
  email: string;
  firstName: string;
  lastName: string;
  callbackUrl: string;
}) {
  try {
    const response = await axios.post(
      `${CHAPA_BASE_URL}/transaction/initialize`,
      {
        amount,
        currency,
        email,
        first_name: firstName,
        last_name: lastName,
        callback_url: callbackUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Chapa initiatePayment error:", error);
    throw error;
  }
}

// Verify payment
export async function verifyPayment(reference: string) {
  try {
    const response = await axios.get(
      `${CHAPA_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Chapa verifyPayment error:", error);
    throw error;
  }
}