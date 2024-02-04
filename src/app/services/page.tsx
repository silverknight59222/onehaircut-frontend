import dynamic from 'next/dynamic';
import React from 'react'

const ChooseService = dynamic(() => import('@/components/pages/ChooseService'), {
  ssr: false, // Désactive le rendu côté serveur pour ce composant
});

export default function page() {
  // Le composant ChooseSalon sera maintenant rendu côté client uniquement
  return <ChooseService />;
}