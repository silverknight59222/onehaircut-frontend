import SearchSalon from '@/components/pages/SearchSalon'
import React from 'react'

interface Id {
  id: string;
}

interface Params {
  params: Id;
}

const page = ({ params }: Params) => {
  return (
    <div><SearchSalon salonId={params.id}/></div>
  )
}

export default page