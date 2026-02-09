import React, { useState } from "react";
import LocationTargeting from "./LocationTargeting";
import AgeGenderTargeting from "./AgeGenderTargeting";
import InterestTargeting from "./InterestTargeting";
import BehaviorTargeting from "./BehaviorTargeting";
import TargetingSummary from "./TargetingSummary";

export interface TargetingData {
  locations: string[];
  ageRange: [number, number];
  genders: string[];
  interests: string[];
  behaviors: string[];
}

const TargetingScreen: React.FC = () => {
  const [targeting, setTargeting] = useState<TargetingData>({
    locations: [],
    ageRange: [18, 65],
    genders: [],
    interests: [],
    behaviors: [],
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Ciblage de l’audience</h1>

      <LocationTargeting
        value={targeting.locations}
        onChange={(locations) =>
          setTargeting({ ...targeting, locations })
        }
      />

      <AgeGenderTargeting
        ageRange={targeting.ageRange}
        genders={targeting.genders}
        onChange={(ageRange, genders) =>
          setTargeting({ ...targeting, ageRange, genders })
        }
      />

      <InterestTargeting
        value={targeting.interests}
        onChange={(interests) =>
          setTargeting({ ...targeting, interests })
        }
      />

      <BehaviorTargeting
        value={targeting.behaviors}
        onChange={(behaviors) =>
          setTargeting({ ...targeting, behaviors })
        }
      />

      <TargetingSummary data={targeting} />
    </div>
  );
};

export default TargetingScreen;
