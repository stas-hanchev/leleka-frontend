"use client";

import React, { useState } from "react";
import { uploadProfilePhoto } from "../../lib/api/api";

interface ProfileAvatarProps {
  avatarUrl: string;
  onUpdate: (newUrl: string) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarUrl,
  onUpdate,
}) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const updatedUrl = await uploadProfilePhoto(file);
      onUpdate(updatedUrl);
    } catch (error) {
      console.error("Помилка завантаження фото", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <img
        src={avatarUrl || "/default-avatar.png"}
        alt="Profile Avatar"
        style={{ width: 120, height: 120, borderRadius: "50%" }}
      />
      <div>
        <label style={{ cursor: "pointer" }}>
          {loading ? "Завантаження..." : "Завантажити нове фото"}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileAvatar;
