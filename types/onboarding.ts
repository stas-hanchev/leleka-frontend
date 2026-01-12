
import * as Yup from 'yup';

export interface OnboardingFormValues {
  avatar: File | null;
  gender: 'boy' | 'girl' | 'unknown' | '';
  deliveryDate: Date | null;
}

export const OnboardingSchema = Yup.object().shape({
  avatar: Yup.mixed().nullable(),
  gender: Yup.string()
    .oneOf(['boy', 'girl', 'unknown'], 'Оберіть стать')
    .required('Це поле обов’язкове'),
  deliveryDate: Yup.date()
    .nullable()
    .required('Вкажіть дату пологів')
    .typeError('Оберіть коректну дату'),
});