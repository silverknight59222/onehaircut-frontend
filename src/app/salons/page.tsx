import dynamic from 'next/dynamic';

// Importez ChooseSalon dynamiquement sans SSR
const ChooseSalon = dynamic(() => import('@/components/pages/ChooseSalon'), {
  ssr: false, // Désactive le rendu côté serveur pour ce composant
});

export default function Home() {
  // Le composant ChooseSalon sera maintenant rendu côté client uniquement
  return <ChooseSalon />;
}
