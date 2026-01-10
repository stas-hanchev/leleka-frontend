"use client";

import React, { useState, useEffect } from "react";
import ProfileAvatar from "../../../../components/profile/ProfileAvatar";
import ProfileEditForm from "../../../../components/profile/ProfileEditForm";
import { getUserProfile } from "../../../../lib/api/api";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      const profile = await getUserProfile();
      setUser(profile);
    }
    fetchProfile();
  }, []);

  if (!user) return <p>Завантаження...</p>;

  const handleAvatarUpdate = (newUrl: string) => {
    setUser((prev: any) => ({ ...prev, avatarUrl: newUrl }));
  };

  const handleProfileUpdate = (updated: any) => {
    setUser((prev: any) => ({ ...prev, ...updated }));
  };

  return (
    <div>
      <h1>Мій профіль</h1>
      <ProfileAvatar avatarUrl={user.avatarUrl} onUpdate={handleAvatarUpdate} />
      <ProfileEditForm
        name={user.name}
        email={user.email}
        childGender={user.childGender}
        dueDate={user.dueDate}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default ProfilePage;
