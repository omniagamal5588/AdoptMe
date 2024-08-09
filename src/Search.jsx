import {useState } from 'react';
import Results from './Results';
import useBreedList from './useBreedList';
import { useQuery } from '@tanstack/react-query';
import fetchSearch from './fetchSearch';
import AdoptedPetContext from './AdoptedPetContext';
import { useSelector } from 'react-redux';

const Animals = ['cat', 'bird', 'dog', 'rabbit', 'reptile'];

const Search = () => {
  const [animal, setAnimal] = useState('');
   const [breeds] = useBreedList(animal);
  const [formState,setFormState]= useState({
    location:"",
    animal:"",
    breed:"",
  });

  
const adoptedPet=useSelector(state=>state.adoptedPet.value)
  const results = useQuery(
    ['search', formState],
    fetchSearch,
  );
  const pets = results?.data?.pets??[];
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          setFormState({
            location: formData.get('location'),
            animal: formData.get('animal'),
            breed: formData.get('breed'),
          });
        }}
      >
        {
          adoptedPet?<div className='pet image-container'>
            <img src={adoptedPet.images[0]} alt={adoptedPet.name}/>
          </div>:null
        }
        <label htmlFor="location">
          location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            value={animal}
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {Animals.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default Search;
