import dynamic from 'next/dynamic';
import React from 'react'

const Portrait = dynamic(() => import('@/components/pages/ClientDashboard/Portrait'), {
  ssr: false, // Désactive le rendu côté serveur pour ce composant
});

export default function Home() {
  // Le composant ChooseSalon sera maintenant rendu côté client uniquement
  return <Portrait />;
}