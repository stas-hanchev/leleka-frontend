"use client";

import React, { useState } from "react";
import { updateUserProfile } from "../../lib/api/api";

interface ProfileEditFormProps {
  name: string;
  email: string;
  childGender: string;
  dueDate: string;
  onUpdate: (data: Partial<UserProfile>) => void;
}

interface UserProfile {
  name: string;
  email: string;
  childGender: string;
  dueDate: string;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  name,
  email,
  childGender,
  dueDate,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    name,
    email,
    childGender,
    dueDate,
  });
  const [errors, setErrors] = useState<Partial<UserProfile>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({ name, email, childGender, dueDate });
    setErrors({});
  };

  const handleSubmit = async () => {
    const newErrors: Partial<UserProfile> = {};
    if (!formData.name.trim()) newErrors.name = "Ім’я обов’язкове";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Неправильний email";
    if (!formData.childGender) newErrors.childGender = "Оберіть стать дитини";
    if (!formData.dueDate) newErrors.dueDate = "Оберіть дату пологів";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const updated = await updateUserProfile(formData);
      onUpdate(updated);
    } catch (error) {
      console.error("Помилка оновлення профілю", error);
    }
  };

  return (
    <div>
      <div>
        <label>Ім’я</label>
        <input name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>
      <div>
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <label>Стать дитини</label>
        <select
          name="childGender"
          value={formData.childGender}
          onChange={handleChange}
        >
          <option value="">Оберіть</option>
          <option value="male">Хлопчик</option>
          <option value="female">Дівчинка</option>
        </select>
        {errors.childGender && (
          <p style={{ color: "red" }}>{errors.childGender}</p>
        )}
      </div>
      <div>
        <label>Планова дата пологів</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        {errors.dueDate && <p style={{ color: "red" }}>{errors.dueDate}</p>}
      </div>

      <div>
        <button type="button" onClick={handleCancel}>
          Відмінити зміни
        </button>
        <button type="button" onClick={handleSubmit}>
          Зберегти зміни
        </button>
      </div>
    </div>
  );
};

export default ProfileEditForm;
