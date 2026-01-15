enum BabyGender {
  boy = 'Хлопчик',
  girl = 'Дівчинка',
  unknown = 'Ще не знаю'
}

export interface User {
  email: string;
  name: string;
  avatarURL: string;
  babyGender: BabyGender;
  birthDate: string | null;
}
