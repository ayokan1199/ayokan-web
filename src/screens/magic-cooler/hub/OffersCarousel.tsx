import React from "react";

interface Offer {
  id: string;
  title: string;
  description: string;
  cost: number;
}

interface Props {
  offers: Offer[];
}

const OffersCarousel: React.FC<Props> = ({ offers }) => {
  return (
    <div className="flex overflow-x-auto space-x-4 py-2">
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="min-w-[200px] bg-white rounded shadow p-3 flex flex-col justify-between"
        >
          <h3 className="font-semibold text-lg">{offer.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{offer.description}</p>
          <div className="mt-2 font-bold">{offer.cost} Étincelles</div>
        </div>
      ))}
    </div>
  );
};

export default OffersCarousel;
