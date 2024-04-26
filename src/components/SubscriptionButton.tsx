"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";

type Props = { isPro: boolean };

const SubscriptionButton = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Estilo para el texto del botón
  const buttonTextStyles = {
    color: "black", // Cambia este valor al color deseado (por ejemplo, "white" para blanco)
  };

  return (
    <Button disabled={loading} onClick={handleSubscription} variant="outline">
      <span style={buttonTextStyles}>
        {props.isPro ? "Manage Subscriptions" : "Get Pro"}
      </span>
    </Button>
  );
};

export default SubscriptionButton;
