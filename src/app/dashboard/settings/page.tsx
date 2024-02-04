import dynamic from 'next/dynamic';
import React from 'react'

const Messages = dynamic(() => import('@/components/pages/Settings/Settings'), {
  ssr: false, // Désactive le rendu côté serveur pour ce composant
});

export default function page() {
  // Le composant ChooseSalon sera maintenant rendu côté client uniquement
  return <Messages />;
}