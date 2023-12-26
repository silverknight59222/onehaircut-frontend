import ChooseSalon from '@/components/pages/ChooseSalon'
import React from 'react'

const page = () => {
  if(typeof window !== 'undefined'){
    return (
      <div><ChooseSalon/></div>
    )
  }
}

export default page