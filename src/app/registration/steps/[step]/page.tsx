import React from 'react'
import Step1 from '@/components/pages/steps/Step1'
import Step2 from '@/components/pages/steps/Step2';
import Step3 from '@/components/pages/steps/Step3';
import Step4 from '@/components/pages/steps/Step4';

interface Steps {
    step: string;
  }
  
  interface Params {
    params: Steps;
  }

const page = ({ params }: Params) => {
  return (
    <div>
        {Number(params.step) === 1 && <Step1/>}
        {Number(params.step) === 2 && <Step2/>}
        {Number(params.step) === 3 && <Step3/>}
        {Number(params.step) === 4 && <Step4/>}
    </div>
  )
}

export default page