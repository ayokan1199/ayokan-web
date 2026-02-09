import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import PromoCodeInput from "./PromoCodeInput";

const CartScreen: React.FC = () => {
  // Exemple de panier avec quelques articles
  const cartItems = [
    { id: "1", name: "Produit A", price: 25, quantity: 2 },
    { id: "2", name: "Produit B", price: 40, quantity: 1 },
  ];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Votre Panier</h1>
      <div className="space-y-2">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <PromoCodeInput />
      <CartSummary items={cartItems} />
    </div>
  );
};

export default CartScreen;
