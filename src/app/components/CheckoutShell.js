"use client";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function CheckoutShell() {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("idle"); 
  const [error, setError] = useState("");


  const SIMULATE_STRIPE = true;

  const onPay = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("processing");

    if (SIMULATE_STRIPE) {
      await new Promise(r => setTimeout(r, 1000));
      setStatus("success");
      return;
    }

    if (!stripe || !elements) {
      setStatus("error");
      setError("Stripe not ready yet.");
      return;
    }

    const card = elements.getElement(CardElement);
  
    setStatus("success");
  };

  return (
    <form onSubmit={onPay} className="payForm">
      <label>Card</label>
      <div className="cardBox">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button className="btn" disabled={status === "processing"} type="submit">
        {status === "processing" ? "Processing…" : "Pay $9.99"}
      </button>

      {status === "success" && <p className="success">✅ Payment successful (demo). Premium unlocked.</p>}
      {status === "error" && <p className="error">⚠️ {error || "Payment failed"}</p>}
    </form>
  );
}
