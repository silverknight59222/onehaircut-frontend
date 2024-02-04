import dynamic from 'next/dynamic';
import React from 'react'

const SearchSalon = dynamic(() => import('@/components/pages/SearchSalon'), {
  ssr: false, // Désactive le rendu côté serveur pour ce composant
});

export default function page() {
  // Le composant ChooseSalon sera maintenant rendu côté client uniquement
  return <SearchSalon />;
}