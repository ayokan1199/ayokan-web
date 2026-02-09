import React from "react";
import ProfileInfo from "./ProfileInfo";
import EmailPhoneSettings from "./EmailPhoneSettings";
import PasswordSecurity from "./PasswordSecurity";
import LinkedAccounts from "./LinkedAccounts";
import SwitchAccount from "./SwitchAccount";
import DeleteAccount from "./DeleteAccount";
import { UserProfile } from "./account.types";

const mockProfile: UserProfile = {
  username: "ayokan_user",
  email: "user@ayokan.app",
  verified: true,
};
screen: "LanguageSelector"

const AccountSettingsScreen: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Compte</h1>

      <ProfileInfo profile={mockProfile} />

      <EmailPhoneSettings />
      <PasswordSecurity />
      <LinkedAccounts />

      <SwitchAccount />
      <DeleteAccount />
    </div>
  );
};

export default AccountSettingsScreen;
