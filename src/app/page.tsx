import React from "react";
import dynamic from "next/dynamic";

const Welcome = dynamic(() => import('@/components/pages/welcome'), {
  ssr: false, // Désactive le rendu côté serveur pour ce composant
});

export default function Page() {
  // Le composant ChooseSalon sera maintenant rendu côté client uniquement
  return <Welcome />;
}
