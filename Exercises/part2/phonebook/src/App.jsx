import { useState } from 'react';
const Person = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
);
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '39-44-5323523' }]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: number,
    };
    if (persons.some((obj) => obj.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
    }
    setNewName('');
    setNumber('');
  };
  // let counter = =;
  //   for (let i = 0; i < persons.length; i++) {
  //     if (persons[i].name === newName) {
  //       counter = counter + 1;
  //     }
  //   }
  //   if (counter === 0) {
  //     setPersons(persons.concat(nameObject));
  //     alert(`${newName} has been created`);
  //   } else {
  //     alert(`${newName} is already added to phonebook`);
  //   }
  //   setNewName('');
  // };
  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </>
  );
};

export default App;
