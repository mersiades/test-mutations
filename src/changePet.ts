import { gql } from '@apollo/client';

import { Pet, PetInput } from '../types';

export interface ChangePetData {
  changePet: Pet;
  __typename?: 'Mutation';
}

export interface ChangePetVars {
  petInput: PetInput;
}

const CHANGE_PET = gql`
  mutation ChangePet($petInput: PetInput!) {
    changePet(petInput: $petInput) {
      id
      type
      __typename
    }
  }
`;

export default CHANGE_PET;
