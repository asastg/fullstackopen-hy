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
    if (persons.some((obj) => obj.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
    }
    setNewName('');
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
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
