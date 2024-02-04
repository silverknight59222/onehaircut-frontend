import React, { useRef, useState } from 'react';
import { FaDeaf, FaRegPauseCircle } from 'react-icons/fa';

interface AudioPlayerProps {
  src: string;
}

// This module is meant to be used to play audio during the tour.
// it uses therefore special icons to to easily detected by the user
// a click on this icon plays the audio
const AudioPlayerForTour: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // handle the click on the play pause icon
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

  // reset icon to start, when the music is done
  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className={"m-1"}>
      {!isPlaying && <FaDeaf onClick={togglePlayPause} size={20} color={""} />}
      {isPlaying && <FaRegPauseCircle onClick={togglePlayPause} size={20} color={""} />}
      <audio ref={audioRef} onEnded={handleAudioEnd}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayerForTour;
