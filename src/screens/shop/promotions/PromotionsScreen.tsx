import React from "react";
import BoostProduct from "./BoostProduct";
import DiscountManager from "./DiscountManager";
import PromotionHistory from "./PromotionHistory";

interface BoostPromotion {
  id: string;
  product: string;
  type: "boost";
}

interface DiscountPromotion {
  id: string;
  product: string;
  type: "discount";
  value: number;
}

type Promotion = BoostPromotion | DiscountPromotion;

const promotions: Promotion[] = [
  { id: "1", product: "T-shirt Cool", type: "boost" },
  { id: "2", product: "Casquette", type: "discount", value: 20 },
];

const PromotionsScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Promotions & Boosts</h1>

      <div className="space-y-2">
        {promotions.map((promo) =>
          promo.type === "boost" ? (
            <BoostProduct key={promo.id} product={promo.product} />
          ) : (
            <DiscountManager
              key={promo.id}
              product={promo.product}
              value={promo.type === "discount" ? promo.value : 0} // ✅ TS safe
            />
          )
        )}
      </div>

      <PromotionHistory />
    </div>
  );
};

export default PromotionsScreen;
