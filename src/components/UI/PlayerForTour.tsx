import React, { useRef, useState } from 'react';
import { FaDeaf, FaRegPauseCircle } from 'react-icons/fa';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayerForTour: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={"m-1"}>
      {!isPlaying && <FaDeaf onClick={togglePlayPause} size={20} color={""} />}
      {isPlaying && <FaRegPauseCircle onClick={togglePlayPause} size={20} color={""} />}
      <audio ref={audioRef}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayerForTour;
