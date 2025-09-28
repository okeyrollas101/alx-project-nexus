// utils/chapa.ts
import axios from "axios";

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const CHAPA_BASE_URL = "https://api.chapa.co/v1";

export async function initiatePayment({
  amount,
  currency = "USD",
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
    const txRef = `tx-${Date.now()}`; // unique reference

    const response = await axios.post(
      `${CHAPA_BASE_URL}/transaction/initialize`,
      {
        amount: amount.toString(), // Chapa expects string
        currency,
        email,
        first_name: firstName,
        last_name: lastName,
        tx_ref: txRef,
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
    if (axios.isAxiosError(error)) {
      console.error("Chapa initiatePayment error:", error.response?.data || error.message);
    } else {
      console.error("Chapa initiatePayment error:", (error as Error).message || error);
    }
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