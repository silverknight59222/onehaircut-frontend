import ChooseService from '@/components/pages/ChooseService'
import React from 'react'

interface HaircutName {
  haircutName: string;
}

interface Params {
  params: HaircutName;
}
const page = ({ params }: Params) => {
  return (
    <div><ChooseService haircutName={params.haircutName} /></div>
  )
}

export default page