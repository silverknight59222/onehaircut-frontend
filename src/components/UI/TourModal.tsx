import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import dynamic from "next/dynamic";
import {useState} from "react";
const Tour = dynamic(() => import("reactour"), { ssr: false });
interface Steps {
  selector: string,
  content: string,
}

type TourModalType = {
  steps: Steps[],
  onRequestClose?:() => void;
}

const TourModal = ({steps, onRequestClose}:TourModalType) => {
  const disableBody = target => disableBodyScroll(target);
  const enableBody = target => enableBodyScroll(target);
  const [isTourOpen, setIsTourOpen] = useState(true);
  const closeTour = () => {
    setIsTourOpen(false)
    onRequestClose && onRequestClose();
  };
  return (
    <>
      <Tour
        // @ts-ignore
        steps={steps}
        showNavigation={false}
        onRequestClose={closeTour}
        rounded={5}
        styles={{dot:'disabled'}}
        isOpen={isTourOpen}
        accentColor={'#ef4444'}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        prevButton={<button>Retour</button>}
        nextButton={<button>Suivant</button>}
        lastStepNextButton={<button>End</button>}
      />
    </>
  )
}

export default TourModal
