import React, { useEffect } from "react";

interface Props {
  soundUrl: string;
  playOnLoad?: boolean;
}

const EntrySoundController: React.FC<Props> = ({ soundUrl, playOnLoad = true }) => {
  useEffect(() => {
    if (playOnLoad) {
      const audio = new Audio(soundUrl);
      audio.play();
    }
  }, [soundUrl, playOnLoad]);

  return null; // pas de rendu visible
};

export default EntrySoundController;
