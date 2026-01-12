"use client";

import { useRef } from "react";
import Image from "next/image";
import { useUploadAvatar } from "@/lib/hooks/useProfile";
import type { User } from "@/types/user";
import styles from "./ProfileAvatar.module.css";

interface ProfileAvatarProps {
  user: User;
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAvatarMutation = useUploadAvatar();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Підтримуються тільки формати: JPG, PNG, WEBP");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Розмір файлу не повинен перевищувати 5MB");
      return;
    }

    try {
      await uploadAvatarMutation.mutateAsync(file);
    } catch (error) {}

    event.target.value = "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Image
          src={user.avatarURL}
          alt={user.name}
          width={132}
          height={132}
          className={styles.avatar}
          priority
        />
      </div>

      <h2 className={styles.name}>Ганна</h2>
      {/* {user.name} */}
      <p className={styles.email}>hanna@gmail.com</p>
      {/* {user.email} */}
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={uploadAvatarMutation.isPending}
        className={styles.uploadButton}
      >
        {uploadAvatarMutation.isPending
          ? "Завантаження..."
          : "Завантажити нове фото"}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className={styles.fileInput}
        aria-label="Завантажити аватар"
      />
    </div>
  );
}
