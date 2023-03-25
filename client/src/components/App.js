import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_PETS = gql`
  query {
    pets {
      id
      name
      species
      breed
      age
    }
  }
`;

const ADD_PET = gql`
  mutation AddPet(
    $name: String!
    $species: String!
    $breed: String
    $age: Int
  ) {
    addPet(name: $name, species: $species, breed: $breed, age: $age) {
      id
      name
      species
      breed
      age
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_PETS);
  const [addPet] = useMutation(ADD_PET, {
    refetchQueries: [{ query: GET_PETS }],
  });

  const [newPet, setNewPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
  });

  const handleChange = (event) => {
    setNewPet({ ...newPet, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPet({ variables: { ...newPet, age: parseInt(newPet.age) } });
    setNewPet({ name: "", species: "", breed: "", age: "" });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Pet Library</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={newPet.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="species"
          value={newPet.species}
          onChange={handleChange}
          placeholder="Species"
        />
        <input
          name="breed"
          value={newPet.breed}
          onChange={handleChange}
          placeholder="Breed"
        />
        <input
          name="age"
          value={newPet.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <button type="submit">Add Pet</button>
      </form>
      <ul>
        {data.pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} - {pet.species} - {pet.breed} - {pet.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
