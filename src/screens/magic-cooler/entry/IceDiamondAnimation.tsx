import React from "react";
import Lottie from "lottie-react";
import iceDiamonds from "../../assets/animations/ice-diamonds.json";

interface Props {
  loop?: boolean;
}

const IceDiamondAnimation: React.FC<Props> = ({ loop = false }) => {
  return (
    <div className="w-full h-96 flex justify-center items-center">
      <Lottie animationData={iceDiamonds} loop={loop} />
    </div>
  );
};

export default IceDiamondAnimation;
