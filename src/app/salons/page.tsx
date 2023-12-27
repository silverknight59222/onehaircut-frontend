// import ChooseSalon from '@/components/pages/ChooseSalon'
// import React from 'react'
// const page = () => {
//     return (
//       <div><ChooseSalon/></div>
//     )
// }

// export default page

import ChooseSalon from '@/components/pages/ChooseSalon'
import React from 'react'

const isSSREnabled = () => typeof window === 'undefined';

export default function Home() {
  return (
    !isSSREnabled() && <ChooseSalon />
  );
}