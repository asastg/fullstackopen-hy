import { useState } from 'react';
const Person = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
);
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  const handleNameFilter = (event) => {
    setShowAll(false);
    setNameFilter(event.target.value);
    if (event.target.value === '') {
      setShowAll(true);
    }
  };
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

  const personsToShow = showAll ? persons : persons.filter((person) => person.name === nameFilter);

  return (
    <>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleNameFilter} />
      <h2>Add a new</h2>
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
      {personsToShow.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </>
  );
};

export default App;
