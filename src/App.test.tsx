import wait from 'waait';
import { screen } from '@testing-library/react';
import { InMemoryCache } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import { MockedResponse } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';

import App from './App';
import { customRenderForComponent } from './test-utils';
import { PET } from './pet';
import { Pet } from '../types';
import CHANGE_PET from './changePet';

describe('Rendering App', () => {
  let cache = new InMemoryCache();

  const mockPet1: Pet = {
    id: 'pet-id-1',
    type: 'Cat',
    __typename: 'Pet',
  };

  const mockPet1_updated: Pet = {
    id: 'pet-id-1',
    type: 'Dog',
    __typename: 'Pet',
  };

  const mockPetQuery: MockedResponse = {
    request: {
      query: PET,
    },
    result: () => {
      // console.log('mockPetQuery');
      return {
        data: {
          pet: mockPet1,
          __typename: 'Query',
        },
      };
    },
  };

  const mockChangePetMutation: MockedResponse = {
    request: {
      query: CHANGE_PET,
      variables: { petInput: mockPet1_updated },
    },
    result: () => {
      // console.log('mockChangePetMutation');
      return {
        data: {
          pet: mockPet1_updated,
          __typename: 'Mutation',
        },
      };
    },
  };

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  test('should render App in initial state', async () => {
    customRenderForComponent(<App />, { apolloMocks: [mockPetQuery], cache });

    // Need to wait for some reason when component first mounts
    (await screen.findByRole('button', { name: 'Dog-ify' })) as HTMLButtonElement;

    // Wait for pet query to come in
    const pet = (await screen.findByRole('heading', { name: /Pet type.*/gm })) as HTMLHeadingElement;

    expect(pet.textContent).toContain('Cat');
  });

  test('should display dog after button click', async () => {
    customRenderForComponent(<App />, { apolloMocks: [mockPetQuery, mockChangePetMutation], cache });

    // Need to wait for some reason when component first mounts
    await act(async () => await wait());

    // Wait for pet query to come in, grab button
    let button = (await screen.findByRole('button', { name: 'Dog-ify' })) as HTMLButtonElement;

    userEvent.click(button);

    // Check if loading
    screen.getByRole('heading', { name: 'Updating pet' });

    // Wait for mutation to return
    const pet = (await screen.findByRole('heading', { name: /Pet type.*/gm })) as HTMLHeadingElement;
    /**
     * FAILING
     * Expected substring: "Dog"
     * Received string:    "Pet type: Cat"
     */
    expect(pet.textContent).toContain('Dog');
  });
});
