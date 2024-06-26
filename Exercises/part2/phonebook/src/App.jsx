import { useState } from 'react';
const Person = ({ name }) => <div>{name}</div>;
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };
    setPersons(persons.concat(nameObject));
    setNewName('');
  };
  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.name} name={person.name} />
      ))}
    </>
  );
};

export default App;
