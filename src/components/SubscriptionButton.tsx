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
    border: "1px solid black", // Agrega un borde negro (contorno) alrededor del texto
    padding: "5px 10px", // Ajusta el relleno según sea necesario
    borderRadius: "5px", // Agrega esquinas redondeadas
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
