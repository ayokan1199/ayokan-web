import React from "react";
import PaymentMethods from "./PaymentMethods";
import ShippingOptions from "./ShippingOptions";
import BillingDetails from "./BillingDetails";
import CheckoutConfirmation from "./CheckoutConfirmation";

const CheckoutScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Passer à la caisse</h1>
      <BillingDetails />
      <ShippingOptions />
      <PaymentMethods />
      <CheckoutConfirmation />
    </div>
  );
};

export default CheckoutScreen;
