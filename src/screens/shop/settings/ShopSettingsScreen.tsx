import React from "react";
import StorePreferences from "./StorePreferences";
import PaymentSettings from "./PaymentSettings";
import ShippingSettings from "./ShippingSettings";
import TaxInformation from "./TaxInformation";

const ShopSettingsScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Paramètres du Shop</h1>

      <StorePreferences />
      <PaymentSettings />
      <ShippingSettings />
      <TaxInformation />
    </div>
  );
};

export default ShopSettingsScreen;
