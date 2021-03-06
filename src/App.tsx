import { useMutation, useQuery } from '@apollo/client';

import { PetInput } from '../types';
import CHANGE_PET, { ChangePetData, ChangePetVars } from './changePet';
import { PET, PetData } from './pet';

function App() {
  const { data: petData } = useQuery<PetData>(PET);

  const [changePet, { loading: changingPet }] = useMutation<ChangePetData, ChangePetVars>(CHANGE_PET);

  const handleChangePet = async () => {
    if (!!petData) {
      const petInput: PetInput = {
        ...petData.pet,
        type: 'Dog',
      };

      try {
        const mutationResponse = await changePet({ variables: { petInput } });
        console.log('mutationResponse', mutationResponse);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      {changingPet ? <h1>Updating pet</h1> : <h1>Pet type: {petData?.pet.type}</h1>}
      <button onClick={() => handleChangePet()}>Dog-ify</button>
    </div>
  );
}

export default App;
