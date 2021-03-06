import { gql } from '@apollo/client';

import { Pet } from '../types';

export interface PetData {
  pet: Pet;
  __typename?: 'Query';
}

export const PET = gql`
  query Pet {
    pet {
      id
      type
      __typename
    }
  }
`;
