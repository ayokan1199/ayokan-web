import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileTabs from "./ProfileTabs";
import BadgesSection from "./BadgesSection";
import GiftSection from "./GiftSection";
import SubscriptionSection from "./SubscriptionSection";
import LiveSection from "./LiveSection";
import PostsGrid from "./PostsGrid";
import ReelsGrid from "./ReelsGrid";

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Posts" | "Reels" | "LIVE" | "Badges">("Posts");

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ProfileHeader username="Alice" badge="VIP" isFollowing={false} />
      <ProfileStats followers={1200} following={150} sparks={500} reels={25} liveCount={3} />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Sections selon l'onglet */}
      {/* Affichage conditionnel des onglets */}
{activeTab === "Posts" && <PostsGrid />}
{activeTab === "Reels" && <ReelsGrid />}
{activeTab === "LIVE" && <LiveSection />}
{activeTab === "Badges" && <BadgesSection />}

      {/* Gift & Subscription Sections */}
      <GiftSection />
      <SubscriptionSection />
    </div>
  );
};

export default ProfileScreen;
