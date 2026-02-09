import React from "react";
import ExplicitGallery from "./ExplicitGallery";
import ProfileDesires from "./ProfileDesires";
import AvailabilityStatus from "./AvailabilityStatus";
import VerificationBadge from "./VerificationBadge";

const PlanCulProfileScreen: React.FC = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="https://via.placeholder.com/100"
          alt="Utilisateur"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">Alice, 25</h2>
          <VerificationBadge verified />
          <AvailabilityStatus available />
        </div>
      </div>

      <ProfileDesires />
      <ExplicitGallery />
    </div>
  );
};

export default PlanCulProfileScreen;
