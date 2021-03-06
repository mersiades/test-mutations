export interface Pet {
  id: string;
  type: 'Cat' | 'Dog';
  __typename?: 'Pet';
}

export interface PetInput {
  id: string;
  type: 'Cat' | 'Dog';
}
