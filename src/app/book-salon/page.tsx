// import BookSalon from '@/components/pages/BookSalon'
import dynamic from 'next/dynamic';
import React from 'react'


// Importez ChooseSalon dynamiquement sans SSR
const BookSalon = dynamic(() => import('@/components/pages/BookSalon'), {
  ssr: false, // Désactive le rendu côté serveur pour ce composant
});

export default function page() {
  // Le composant ChooseSalon sera maintenant rendu côté client uniquement
  return <BookSalon />;
}