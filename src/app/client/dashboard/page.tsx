"use client";
import dynamic from "next/dynamic";
import React from "react";

const Account = dynamic(() => import('@/components/pages/ClientDashboard/Account'), {
  ssr: false, // Désactive le rendu côté serveur pour ce composant
});

export default function page() {
  // Le composant ChooseSalon sera maintenant rendu côté client uniquement
  return <Account />;
}