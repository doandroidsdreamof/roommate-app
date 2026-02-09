import {
  CreatePostingFormData
} from '@/schemas/postingSchema';
import { FieldPath } from 'react-hook-form';
import DetailStepfields from './detailStepfields/DetailStepfields';
import ImagesStepFields from './imagesStepFields/ImagesStepFields';
import SpecsStepFields from './specsStepFields/SpecsStepFields';

export type Step = 'details' | 'specs' | 'images';

export interface StepFieldProps {
  formData: Partial<CreatePostingFormData>;
  onFieldChange: <K extends keyof CreatePostingFormData>(
    field: K,
    value: CreatePostingFormData[K]
  ) => void;
  onSpecsChange: <K extends keyof CreatePostingFormData['specs']>(
    field: K,
    value: CreatePostingFormData['specs'][K]
  ) => void;
  coverImage: string | null;
  additionalImages: string[];
  pickCoverImage: () => void;
  pickAdditionalImages: () => void;
  removeAdditionalImage: (index: number) => void;
  removeCoverImage: () => void;
}
export type PostingFieldPath = FieldPath<CreatePostingFormData>;

export interface StepConfig {
  id: Step;
  title: string;
  requiredFields: PostingFieldPath[];
  component: React.ComponentType<StepFieldProps>;
}

export const STEP_CONFIGS: StepConfig[] = [
  {
    id: 'details',
    title: 'İlan Detayları',
    requiredFields: [
      'title',
      'specs.description',
      'city',
      'district',
      'neighborhood',
      'rentAmount',
      'roomCount',
      'bathroomCount',
      'squareMeters',
      'preferredRoommateGender',
      'isFurnished',
      'availableFrom',
    ],
    component: DetailStepfields,
  },
  {
    id: 'specs',
    title: 'Özellikler',
    requiredFields: [
      'specs.depositAmount',
      'specs.floor',
      'specs.totalFloors',
      'specs.ageMin',
      'specs.ageMax',
      'specs.billsIncluded',
      'specs.hasBalcony',
      'specs.hasParking',
      'specs.hasElevator',
    ],
    component: SpecsStepFields,
  },
  {
    id: 'images',
    title: 'Fotoğraflar',
    requiredFields: ['coverImageUrl'],
    component: ImagesStepFields,
  },
];